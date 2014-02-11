// Usage:
// step 1, either:
// OAuth:
// var auth = {
//   authType: 'oauth',
//   oauth: 'authkeyhere'
// }
// *****OR*****
// Basic Auth:
// var auth = {
//   authType: 'basic',
//   username: 'username here',
//   password: 'password here'
// }
//
// Step 2:
// var ghpp = new GithubPlusPlus(auth);
function GithubPlusPlus(auth) {
  this.supportedAuthTypes = [
    "basic",
    "oauth"
  ];

  this.githubAPIWrapper = null;
  // this.authType = 'basic';
  this.authType = auth.authType;
  this.username = auth.username;
  this.password = auth.password;
  this.OAuth = auth.oauth;
  this.owner = window.location.pathname.split('/')[1];
  this.repo = window.location.pathname.split('/')[2];

  this.__construct();
};


GithubPlusPlus.prototype.__construct = function() {
  this.githubAPIWrapper = this.auth(this.authType, {
    username: this.username,
    password: this.password,
    token: this.OAuth
  });

  // @TODO put loading gifs
  var issues = this.githubAPIWrapper.getIssues(this.owner, this.repo);

  //          options, callback
  issues.list({}, this.parseIssues);

},

/**
 * callback for the issues.list()
 * @param  {Object} errors errors from the list method (if any)
 * @param  {Array} issues array of issues that were returned from the Github API
 */
GithubPlusPlus.prototype.parseIssues = function(errors, issues) {
  // var issueId,
  var $this,
    username;

  $('.pulls-list-group .list-group-item').each(function(issueCount) {
    $this = $(this);
    // issueId = $this.find('.list-group-item-number').text();

    if (issues[issueCount].assignee === null) {
      $this.find('.list-group-item-meta').append('<li>Assigned to no one</li>');
    }
    else {
      username = issues[issueCount].assignee.login;
      $this.find('.list-group-item-meta').append('<li>Assigned to <a href="/' + username + '">' + username + '</a></li>');
    }
  });
};

/**
 * Github authentication
 * @param  {string} authType    - "basic" or "OAuth"
 * @param  {Object} credentials - if authType is basic:
 *                                { username: "USERNAME HERE", password: "PASSWORD HERE" }
 *                              if authType = OAuth:
 *                                { token: "OAUTH_TOKEN" }
 */
 GithubPlusPlus.prototype.auth = function(authType, credentials) {
  // make sure we're passed both params
  if (!authType || !credentials) {
    throw "Both paramaters are required";
  }
  // make sure we're passed a valid/supported auth type
  if ($.inArray(authType, this.supportedAuthTypes) === -1) {
    throw "Unsupported Auth Type";
  }
  // basic auth
  if (authType.toLowerCase() === 'basic') {
    if (!credentials.username && !credentials.password) {
      throw "Username and password are required";
    }
    return new Github({
      username: credentials.username,
      password: credentials.password,
      auth: "basic"
    });
  }
  if (authType.toLowerCase() === 'oauth') {
    if (!credentials.token) {
      throw "OAuth token is required";
    }
    return new Github({
      token: credentials.token,
      auth: "oauth"
    });
  }
  throw "Error";
}

new GithubPlusPlus({
  authType: 'oauth',
  oauth: 'enter auth key'
});
