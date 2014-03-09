Github++
============

** update: use the issues page. **
Chrome Extension to add features to Github

To use, you need to edit GithubPlusPlus.js and add either your username and password or
add an OAuth token (and change authType to 'OAuth' instead of 'basic'):

For 'OAuth Authentication':
```
var auth = {
  authType: 'oauth',
  oauth: 'authkeyhere'
}
var ghpp = new GithubPlusPlus(auth);
```

Or for 'Basic Authentication'
```
Basic Auth:
var auth = {
  authType: 'basic',
  username: 'username here',
  password: 'password here'
}
var ghpp = new GithubPlusPlus(auth);
```

If you need an auth token you can read about it [here](https://help.github.com/articles/creating-an-access-token-for-command-line-use)

You then need to add this extension to Chrome, you can [read about it here](http://developer.chrome.com/extensions/getstarted.html#unpacked)

This library uses:

[Michael's Github JS Library](https://github.com/michael/github)
