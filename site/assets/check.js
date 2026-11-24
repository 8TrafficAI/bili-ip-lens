const symptoms = document.querySelectorAll(".check-choices details");

function openLinkedSymptom() {
  for (const symptom of symptoms) {
    if (window.location.hash === `#${symptom.id}`) {
      symptom.open = true;
      symptom.scrollIntoView({ block: "start" });
      break;
    }
  }
}

openLinkedSymptom();
window.addEventListener("hashchange", openLinkedSymptom);

const source = new URLSearchParams(window.location.search).get("from");
if (["github", "zhihu", "greasyfork", "x", "bilibili", "reddit"].includes(source)) {
  const storeLink = document.querySelector("[data-check-store]");
  const storeUrl = new URL(storeLink.href);
  storeUrl.searchParams.set("utm_source", source);
  storeLink.href = storeUrl.href;
}
