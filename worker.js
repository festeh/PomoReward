chrome.action.onClicked.addListener((tab) => console.log(tab));

chrome.tabs.onUpdated.addListener((tabId, info) => {
  if (info.url) {
    console.log("Tab updated:", tabId, info);
    chrome.tabs.sendMessage(
      tabId,
      {
        method: "address-changed",
      },
      () => chrome.runtime.lastError
    );
  }
});
