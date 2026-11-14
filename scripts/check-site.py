"""Check shipped static pages and local resources without browser dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
from xml.etree import ElementTree
import json
import posixpath

root = Path(__file__).resolve().parent.parent / 'site'
base = 'https://8trafficai.github.io/bili-ip-lens/'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.canonical = []
        self.description = []
        self.resources = []
        self.json_blocks = []
        self.in_json = False
        self.block = ''

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.h1 += tag == 'h1'
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description.append(attrs.get('content', ''))
        for key in ('href', 'src'):
            if attrs.get(key):
                self.resources.append(attrs[key])
        if tag == 'meta' and attrs.get('property') == 'og:image':
            assert attrs.get('content', '').endswith('.png'), 'Use a raster social preview'
            self.resources.append(attrs['content'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json = True
            self.block = ''

    def handle_data(self, data):
        if self.in_json:
            self.block += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.in_json:
            self.json_blocks.append(self.block)
            self.in_json = False


urls = set()
for file in sorted(root.rglob('*.html')):
    relative = file.relative_to(root).as_posix()
    canonical = base + (relative.removesuffix('index.html') if relative.endswith('index.html') else relative)
    page = Page()
    page.feed(file.read_text())
    assert page.h1 == 1, f'{relative}: expected exactly one h1'
    assert page.canonical == [canonical], f'{relative}: invalid canonical'
    assert len(page.description) == 1 and page.description[0].strip(), f'{relative}: missing description'
    for block in page.json_blocks:
        data = json.loads(block)
        assert 'aggregateRating' not in block and 'reviewRating' not in block, 'No unearned ratings'
        assert data.get('@context') == 'https://schema.org'
    for resource in page.resources:
        parsed = urlparse(resource)
        if resource.startswith(base):
            path = unquote(urlparse(resource).path.removeprefix('/bili-ip-lens/'))
        elif parsed.scheme or parsed.netloc or not parsed.path:
            continue
        else:
            path = posixpath.normpath(posixpath.join(posixpath.dirname(relative), unquote(parsed.path)))
        target = root / path
        if target.is_dir():
            target = target / 'index.html'
        assert target.exists(), f'{relative}: broken local resource {resource}'
        assert target.resolve().is_relative_to(root.resolve()), f'{relative}: escaped site root'
    urls.add(canonical)

tree = ElementTree.parse(root / 'sitemap.xml')
mapped = {node.text for node in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert mapped == urls, 'Sitemap must match the actual canonical page set'
for relative in ('SKILL.md', 'scripts/install-extension.sh', 'references/verification.md'):
    source = root.parent / 'skills' / 'bili-ip-lens' / relative
    mirror = root / 'skills' / 'bili-ip-lens' / relative
    assert source.read_bytes() == mirror.read_bytes(), f'Skill text mirror drift: {relative}'
assert (root / '.nojekyll').exists()
assert not (root / 'robots.txt').exists(), 'Project-path robots.txt would not control the host root'
print(f'Static site passed: {len(urls)} pages, canonicals, metadata, JSON-LD, sitemap, local links and assets.')
