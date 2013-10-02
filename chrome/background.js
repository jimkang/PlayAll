function doWhenSwfObjectIsLoaded() {
  chrome.tabs.executeScript(null, {
    file: "pagecomber.js",
    allFrames: true
  },
  doWhenPageComberIsLoaded);
}

function doWhenPageComberIsLoaded() {
  chrome.tabs.executeScript(null, {
    file: "playall.js",
    allFrames: true
  });
}

chrome.browserAction.onClicked.addListener(function respondToClick(tab) {
  console.log('Yo guy.');
  chrome.tabs.executeScript(null, {
    file: "swfobject.js",
    allFrames: true
  }, 
  doWhenSwfObjectIsLoaded);  
});
