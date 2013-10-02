// This is meant to run in the context of the post page in a <script> tag.

var PlayAll = {
  videoIds: [],
  nowPlayingIndex: -1,
  player: null
};

PlayAll.start = function start() {
  this.player = document.getElementById('playAllPlayer');
  if (!this.player) {
    console.log('Playall could not get the video player.');
    return;
  }
  
  PlayAll.player.addEventListener('onStateChange', 'onYouTubePlayerStateChange');

  this.videoIds = this.collectYouTubeIds();

  if (this.videoIds.length < 1) {
    return;
  }

  this.playNext();
};

PlayAll.playNext = function playNext() {
  ++this.nowPlayingIndex;
  this.player.loadVideoById(this.videoIds[this.nowPlayingIndex]);
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

PlayAll.collectYouTubeIds = function collectYouTubeIds() {
  var ids = [];
  var linkEls = document.querySelectorAll('a[href*="youtube.com"]');
  for (var i = 0; i < linkEls.length; ++i) {
    var linkEl = linkEls[i];
    var theId = this.getQueryParamFromURL(linkEl.href, 'v');
    if (theId) {
      ids.push(theId);
    }
  }
  return ids;
};

PlayAll.getQueryParamFromURL = function getQueryParamFromURL(url, param) {
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

function onYouTubePlayerReady(playerId) {
  PlayAll.start();
}

function onYouTubePlayerStateChange(newState) {
  // YT.PlayerState.ENDED
  if (0 === newState) {
    debugger;
    PlayAll.playNext();
  }
};

