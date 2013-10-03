// This is meant to run in the context of the post page in a <script> tag.

var PlayAll = {
  videoIds: [],
  nowPlayingIndex: 0,
  player: null
};

PlayAll.start = function start() {
  this.player = document.getElementById('playAllPlayer');
  if (!this.player) {
    console.log('Playall could not get the video player.');
    return;
  }

  PlayAll.player.addEventListener('onStateChange', 'onYouTubePlayerStateChange');

  document.querySelector('#nextButton').addEventListener('click',
    this.playNext.bind(this));
  document.querySelector('#prevButton').addEventListener('click',
    this.playPrev.bind(this));
  document.querySelector('#closeButton').addEventListener('click',
    this.kill.bind(this));

  this.videoIds = this.collectYouTubeIds();
};

PlayAll.playNext = function playNext() {
  ++this.nowPlayingIndex;
  if (this.nowPlayingIndex >= this.videoIds.length) {
    this.nowPlayingIndex = this.videoIds.length - 1;
  }

  this.player.loadVideoById(this.videoIds[this.nowPlayingIndex]);
};

PlayAll.playPrev = function playPrev() {
  --this.nowPlayingIndex;
  if (this.nowPlayingIndex < 0) {
    this.nowPlayingIndex = 0;
  }
  this.player.loadVideoById(this.videoIds[this.nowPlayingIndex]);
};

PlayAll.kill = function kill() {
  this.player.stopVideo();
  var container = document.querySelector('#playerContainer');
  container.parentNode.removeChild(container);
};

PlayAll.collectYouTubeIds = function collectYouTubeIds() {
  var ids = [];
  var linkEls = document.querySelectorAll('a[href*="youtube.com"][href*="v="]');
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
    PlayAll.playNext();
  }
};

