PlayAll
=======

Chrome extensions that finds all of the YouTube links in a page, then plays them sequentially within the page.

To install the extension:

1. Go to Extensions in Chrome.
2. Check "Developer mode".
3. Hit "Load unpacked extension" and point it to the chrome directory in this repo.

Structure
=========

__background.js__ waits around in the (wait for it) background to respond to the user hitting the extension's button. When that happens, it loads scripts to be executed in the context of the page in the current tab.

__playerloader.js__ is one of the context scripts. PlayerLoader creates the container and buttons for the YouTube player and calls embedSWF to create the player.

PlayerLoader also adds playall.js to the context of the page in addPlayerReadyListener. PlayerLoader needs to do this by adding script elements to the page in order for the event listeners inside playall.js to actually work.

The two global event listeners in __playall.js__ call PlayAll.start and respond to videos ending by playing the next video. PlayAll is responsible for finding the YouTube links, playing them, and responding to clicks to the controls.
