Github++
============

Chrome Extension to add features to Github

To use, you need to edit yolo.js and add either your username and password or
add an OAuth token (and change authType to 'OAuth' instead of 'basic').
You need to edit the repo/owner as well.

![Creating an OAuth token:](https://help.github.com/articles/creating-an-access-token-for-command-line-use)

You then need to add this extension to Chrome.

![Read here about adding an unpacked extension to Chrome](http://developer.chrome.com/extensions/getstarted.html#unpacked)


Todo:

* Add options page for Auth Type and username, password or OAuth (there is a base that's from the forked repo)
* Add filter for assignee (for example, only show assigned to me)
