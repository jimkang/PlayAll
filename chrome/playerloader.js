var PlayerLoader = {};

PlayerLoader.addPlayerReadyListener = function addPlayerReadyListener() {
  // You can't add a window event listener from a content script, so we gotta 
  // do this.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.extension.getURL('playall.js');
  (document.head || document.body || document.documentElement)
    .appendChild(script);
};

PlayerLoader.createPlayerContainerElement = 
function createPlayerContainerElement() {
  var playerWidth = 700;
  var playerHeight = 418;

  var playerContainer = document.createElement('div');
  playerContainer.id = 'playerContainer';
  playerContainer.style.position = 'fixed';
  playerContainer.style.top = '50%';
  playerContainer.style.left = '50%';
  playerContainer.style.marginLeft = '-' + playerWidth/2 + 'px';
  playerContainer.style.marginTop = '-' + playerHeight/2 + 'px';
  playerContainer.style.paddingLeft = '8px';
  playerContainer.style.paddingRight = '8px';
  playerContainer.style.paddingTop = '4px';
  playerContainer.style.paddingBottom = '4px';
  playerContainer.style.borderRadius = '4px'; 
  playerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

  document.body.appendChild(playerContainer);

  var closeButton = document.createElement('button');
  closeButton.id = 'closeButton';
  closeButton.innerHTML = 'Close';
  closeButton.style.float = 'right';
  closeButton.style.marginBottom = '4px';

  playerContainer.appendChild(closeButton);

  // var hideButton = document.createElement('button');
  // hideButton.id = 'hideButton';
  // hideButton.innerHTML = 'hide';
  // hideButton.style.display = 'block';
  // hideButton.style.marginLeft = '0px';
  // hideButton.style.marginRight = 'auto';

  // playerContainer.appendChild(hideButton);

  var playerStub = document.createElement('div');
  playerStub.id = 'playAllPlayer';
  playerStub.style.width = playerWidth;
  playerStub.style.height = playerHeight;

  playerContainer.appendChild(playerStub);

  var nextButton = document.createElement('button');
  nextButton.id = 'nextButton';
  nextButton.innerHTML = 'Next';
  nextButton.style.float = 'right';

  playerContainer.appendChild(nextButton);

  var prevButton = document.createElement('button');
  prevButton.id = 'prevButton';
  prevButton.innerHTML = 'Previous';
  prevButton.style.float = 'left';

  playerContainer.appendChild(prevButton);

  return playerContainer;
};

PlayerLoader.load = function load() {
  var existingPlayerContainer = document.querySelector('#playerContainer');
  if (existingPlayerContainer) {
    return;
  }

  var linkEl = document.querySelector('a[href*="youtube.com"][href*="v="]');
  var firstVideoId = this.getQueryParamFromURL(linkEl.href, 'v');
  if (!firstVideoId) {
    return;
  }

  this.addPlayerReadyListener();
  var playerContainerEl = this.createPlayerContainerElement();

  var firstVideoURL = 'https://www.youtube.com/v/' + firstVideoId + 
    '?enablejsapi=1&playerapiid=ytplayer&version=3';
  var params = {allowScriptAccess: "always"};
  var atts = {id: "playAllPlayer"};
  swfobject.embedSWF(firstVideoURL, 'playAllPlayer', '700', '418', '8', 
    null, null, params, atts);
};

// Unfortunate copy of the function from PlayAll (PlayAll runs in the page 
// context, so sharing code is tough).
PlayerLoader.getQueryParamFromURL = function getQueryParamFromURL(url, param) {
  var val = null;
  var linkParts = url.split('?');
  if (linkParts.length > 1) {
    var queryString = linkParts[1];
    var queryParts = queryString.split('&');
    for (var i = 0; i < queryParts.length; ++i) {
      var queryPart = queryParts[i];
      var keyAndValue = queryPart.split('=');
      if (keyAndValue.length === 2) {
        if (keyAndValue[0] === param) {
          val = keyAndValue[1];
          break;
        }
      }
    }
  }
  return val;
};

PlayerLoader.load();
