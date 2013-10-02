// This is meant to run in the context of the post page in a <script> tag.

var PlayAll = {
  URLs: [],
  player: null
};

PlayAll.playAll = function playAll() {
  this.player = document.getElementById('playAllPlayer');
  if (!this.player) {
    return;
  }
  
  alert('oy!');

  this.URLs = this.collectYouTubeURLs();

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

PlayAll.createPlayerContainerElement = function createPlayerContainerElement() {
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

PlayAll.collectYouTubeURLs = function collectYouTubeURLs() {
  var URLs = [];
  var linkEls = document.querySelectorAll('a[href*="youtube.com"]');
  for (var i = 0; i < linkEls.length; ++i) {
    var linkEl = linkEls[i];
    URLs.push(linkEl.href);
  }
  return URLs;
}

function onYouTubePlayerReady(playerId) {
  PlayAll.playAll();
}
