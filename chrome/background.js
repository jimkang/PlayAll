function doWhenSwfObjectIsLoaded() {
  chrome.tabs.executeScript(null, {
    file: "playerloader.js",
    allFrames: true
  });
}

chrome.browserAction.onClicked.addListener(function respondToClick(tab) {
  chrome.tabs.executeScript(null, {
    file: "swfobject.js",
    allFrames: true
  }, 
  doWhenSwfObjectIsLoaded);  
});
