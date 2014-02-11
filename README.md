Github++
============

Chrome Extension to add features to Github

To use, you need to edit GithubPlusPlus.js and add either your username and password or
add an OAuth token (and change authType to 'OAuth' instead of 'basic'). (this is near the bottom of the file)

Usage:

Usage:
step 1, either:
OAuth:
var auth = {
  authType: 'oauth',
  oauth: 'authkeyhere'
}
`*****OR*****`
Basic Auth:
var auth = {
  authType: 'basic',
  username: 'username here',
  password: 'password here'
}

Step 2:
var ghpp = new GithubPlusPlus(auth);

[Creating an OAuth token](https://help.github.com/articles/creating-an-access-token-for-command-line-use)

You then need to add this extension to Chrome.

[Read here about adding an unpacked extension to Chrome](http://developer.chrome.com/extensions/getstarted.html#unpacked)

Thanks to:

[Michael's Github JS Library](https://github.com/michael/github)
