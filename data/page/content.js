function block() {
  const id = "banner";
  if (!document.getElementById(id)) {
    const node = document.createElement("div");
    node.id = id;

    document.body.appendChild(node);
  }
  let node = document.getElementById(id)
  let xPos = 0;
  setInterval(() => {
    xPos++;
    node.style.left = 10 * xPos + "px";
    if (node.getBoundingClientRect().x > window.innerWidth) {
      console.log("oob!");
      node.x = 0;
      xPos = 0;
    }
  }, 35)
}
function validate() {
  console.log("validating");
  chrome.storage.local.get({ blocked: [] }, (result) => {
    let href = location.href.toString();
    console.log("result", result);
    if (result.blocked.length > 0) {
      result.blocked.forEach((blockedSite) => {
        console.log("trying", blockedSite, "for", href);
        if (href.includes(blockedSite)) {
          console.log("site blocked: ", href);
          block();
        }
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", function (event) {
  validate();
});

// chrome.runtime.onMessage.addListener((request) => {
//   if (request.method === "address-changed") {
//     validate();
//   }
// });
