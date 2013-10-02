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
  // script.innerHTML = 'PlayAll.playAll()';
  (document.head || document.body || document.documentElement)
    .appendChild(script);
};

PlayerLoader.createPlayerContainerElement = function createPlayerContainerElement() {
  var playerContainer = document.createElement('div');
  playerContainer.id = 'playerContainer';
  document.body.appendChild(playerContainer);

  var playerStub = document.createElement('div');
  playerStub.id = 'playAllPlayer';
  playerStub.style.width = 700;
  playerStub.style.height = 418;
  playerStub.style.marginLeft = 'auto';
  playerStub.style.marginRight = 'auto';
  playerStub.style.marginTop = 'auto';
  playerStub.style.marginBottom = 'auto';
  playerContainer.appendChild(playerStub);

  return playerContainer;
};

PlayerLoader.load = function load() {
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
