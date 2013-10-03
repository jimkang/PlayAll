var PlayerLoader = {
  pageComber: createPageComber(),
  URLs: []
};

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
  playerContainer.style.paddingLeft = '1em';
  playerContainer.style.paddingRight = '1em';
  playerContainer.style.backgroundColor = 'purple';

  document.body.appendChild(playerContainer);

  var playerStub = document.createElement('div');
  playerStub.id = 'playAllPlayer';
  playerStub.style.width = playerWidth;
  playerStub.style.height = playerHeight;

  playerContainer.appendChild(playerStub);

  this.createButtonsForContainer(playerContainer);

  return playerContainer;
};

PlayerLoader.createButtonsForContainer = 
function createButtonsForContainer(playerContainer) {
  var nextButton = document.createElement('button');
  nextButton.id = 'nextButton';
  nextButton.innerHTML = 'Next';
  nextButton.style.display = 'block';
  nextButton.style.marginLeft = 'auto';
  nextButton.style.marginRight = '0px';

  playerContainer.appendChild(nextButton);

  var prevButton = document.createElement('button');
  prevButton.id = 'prevButton';
  prevButton.innerHTML = 'Previous';
  prevButton.style.display = 'block';
  prevButton.style.marginLeft = 'auto';
  prevButton.style.marginRight = '0px';

  playerContainer.appendChild(prevButton);

  var closeButton = document.createElement('button');
  closeButton.id = 'closeButton';
  closeButton.innerHTML = 'Close';
  closeButton.style.display = 'block';
  closeButton.style.marginLeft = '0px';
  closeButton.style.marginRight = 'auto';

  playerContainer.appendChild(closeButton);

  // var hideButton = document.createElement('button');
  // hideButton.id = 'hideButton';
  // hideButton.innerHTML = 'hide';
  // hideButton.style.display = 'block';
  // hideButton.style.marginLeft = '0px';
  // hideButton.style.marginRight = 'auto';

  // playerContainer.appendChild(hideButton);
};

PlayerLoader.load = function load() {
  var existingPlayerContainer = document.querySelector('#playerContainer');
  if (existingPlayerContainer) {
    return;
  }

  this.addPlayerReadyListener();

  this.URLs = this.pageComber.collectYouTubeURLs();

  if (this.URLs.length < 1) {
    return;
  }

  var playerContainerEl = this.createPlayerContainerElement();

  var params = {allowScriptAccess: "always"};
  var atts = {id: "playAllPlayer"};
  swfobject.embedSWF(
    // this.URLs[0] + '?enablejsapi=1&playerapiid=ytplayer&version=3',
    "http://www.youtube.com/v/FAvQSkK8Z8U?enablejsapi=1&playerapiid=ytplayer&version=3",
     'playAllPlayer', '700', '418', '8', null, null, params, atts);
};

PlayerLoader.load();
