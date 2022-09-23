function add(hostname) {
  console.log("Hostname: " + hostname + ";");
  let template = document.querySelector("#list template");
  let node = document.importNode(template.content, true);
  let div = node.querySelector("div");
  div.dataset.hostname = hostname;

  let span = node.querySelector("span");
  span.textContent = hostname;

  let rules = document.getElementById("rules-container");
  rules.appendChild(node);

  let list = document.getElementById("list");
  list.dataset.visible = true;
}

function save() {
  chrome.storage.local.set({
    blocked: [...document.querySelectorAll("#rules-container > div")].map(
      (e) => e.dataset.hostname
    ),
  });
}

const DEFAULTS = {
  blocked: ["web.telegram.org"]
}

function init() {
  chrome.storage.local.get(DEFAULTS, result => {
    result.blocked.map(add)
  })
}
init()

document.getElementById("input").addEventListener("submit", (e) => {
  e.preventDefault();
  let hostname = document.getElementById("hostname").value;
  if (hostname) {
    add(hostname);
    save();
  }
  // hostname.value = ''
});

document.addEventListener("click", (e) => {
  const {target} = e
  target.closest("div").remove()
  save()
})
