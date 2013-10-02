function createPageComber() {

var PageComber = {
  
};

PageComber.collectYouTubeURLs = function collectYouTubeURLs() {
  var URLs = [];
  var linkEls = document.querySelectorAll('a[href*="youtube.com"]');
  for (var i = 0; i < linkEls.length; ++i) {
    var linkEl = linkEls[i];
    URLs.push(linkEl.href);
  }
  return URLs;
}

// Huh, guess there's not much else to do for PageComber! Easy combin'.

return PageComber;
}
