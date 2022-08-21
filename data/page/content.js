function validate() {
  chrome.runtime.sendMessage({}, res => {})
  
}

chrome.runtime.onMessage.addListener(
  request => {
    console.log(request);
  }
)
