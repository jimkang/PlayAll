// window.onYouTubePlayerReady = 
// function onYouTubePlayerReady(playerId) {
//   debugger;
//   alert('ready!');
//   PlayAll.player = document.getElementById('playAllPlayer');
// }


// window.addEventListener('YouTubePlayerReady', onYouTubePlayerReady);

var PlayAll = {
  pageComber: createPageComber(),
  URLs: [],
  player: null
};

PlayAll.addPlayerReadyListener = function addPlayerReadyListener() {
  // You can't add a window event listener from a content script, so we gotta 
  // do this.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = 
    'function onYouTubePlayerReady(playerId) {alert("ready!"); PlayAll.respondToPlayerReady();}';
  (document.head || document.body || document.documentElement)
    .appendChild(script);
};

PlayAll.playAll = function playAll() {
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

  // var svg = d3.select('body').insert('svg', ':first-child').style({
  //   position: 'absolute',
  //   left: 0
  // });

  // var background = svg.append('g').attr('id', 'shibebg');
  // var bgRect = background.append('rect').attr({
  //   id: 'shibebgrect',
  //   width: '100%',
  //   height: '100%',
  //   fill: 'pink',
  //   opacity: 0.5
  // });
  // this.thingsLayer = svg.append('g').attr('id', 'things');

  // debugger;

  // this.shibedThings = this.makeImagesFromImgs(this.sourceImgEls)
  // this.shibedThings = this.shibedThings.concat(
  //   this.addSVGImages(this.sourceSVGImageEls)
  // );
  // this.shibedThings = this.shibedThings.concat(
  //   this.makeForeignObjectsFromNodes(this.nodesWithBGImages)
  // );
  // // this.shibedThings.concat(
  // //   this.makeImagesFromLocations(this.sourceCSSBgImageLocations)
  // // );

  // this.placeThings(this.shibedThings);
};

// // HTML to SVG converters

// PlayAll.makeImagesFromImgs = function makeImagesFromImgs(sourceImgEls) {
//   var madeThings = [];
//   sourceImgEls.forEach(function makeThing(sourceThing) {
//     madeThings.push(this.makeImage(sourceThing));
//   }
//   .bind(this));

//   return madeThings;
// };

// PlayAll.makeImage = function makeImage(imageEl) {
//   var image = this.thingsLayer.append('image').attr({
//     'xlink:href': imageEl.src,
//     width: imageEl.width,
//     height: imageEl.height
//   });
//   return image;
// };

// PlayAll.makeImagesFromLocations = function makeImagesFromLocations(locations) {
//   var madeImages = [];
//   locations.forEach(function makeImage(location) {
//     madeImages.push(this.thingsLayer.append('image').attr({
//       'xlink:href': location
//     }));
//   }
//   .bind(this));

//   return madeImages;
// };

// PlayAll.makeForeignObjectsFromNodes = 
// function makeForeignObjectsFromNodes(sourceNodes) {
//   var foreignObjects = [];
//   sourceNodes.forEach(function makeObj(sourceNode) {
//     foreignObjects.push(this.makeForeignObjectFromNode(sourceNode));
//   }
//   .bind(this));

//   return foreignObjects;
// };

// PlayAll.makeForeignObjectFromNode = function makeForeignObjectFromNode(node) {
//   var foreignObj = this.thingsLayer.append('foreignObject');
//   var body = foreignObj.append('xhtml:body');
//   body.node().appendChild(node);

//   // node.clientWidth get set after it is inserted into a body.
//   foreignObj.attr({
//     width: node.clientWidth,
//     height: node.clientHeight
//   });

//   return foreignObj;
// };


// // Placers

// PlayAll.placeThings = function placeThings(things) {
//   for (var i = 0; i < things.length; ++i) {
//     things[i].attr('y', i * 50);
//   }
// };

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

PlayAll.respondToPlayerReady = function respondToPlayerReady() {
  this.player = document.getElementById('playAllPlayer');
};

PlayAll.playAll();
