function block() {
  const id = "banner";
  if (!document.getElementById(id)) {
    const node = document.createElement("img");
    node.setAttribute("src", chrome.runtime.getURL("images/peka.png"))
    node.setAttribute("alt", "peka")
    node.id = id;

    document.body.appendChild(node);
  }
  let node = document.getElementById(id)
  let xPos = 0;
  let yPos = 0;

  node.style.left = xPos + "px";
  node.style.top = yPos + "px";

  let xVel = 10;
  let yVel = 10;
  setInterval(() => {
    xPos += xVel;
    yPos += yVel;
    node.style.left = xPos + "px";
    node.style.top = yPos + "px";
    const rect = node.getBoundingClientRect();
    if (rect.x < 0) {
      xVel *= -1;
    }
    if (rect.y < 0) {
      yVel *= -1;
    }
    if (rect.x + rect.width > window.innerWidth) {
      xVel *= -1;
    }
    if (rect.y + rect.height > window.innerHeight) {
      yVel *= -1;
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
