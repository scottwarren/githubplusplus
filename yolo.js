// requires https://gist.github.com/scottwarren/8913568 to be ran first
var YOLO = {
  supportedAuthTypes: [
    "basic",
    "oauth"
  ],
  github: {},

  // authType: 'basic',
  authType: 'oauth',
  username: 'username here',
  password: 'password here',
  OAuth: 'a610b80191020b5e33509f73e7ea922a874ac04f',
  owner: 'fclimited',
  repo: 'soar',

  swag: function() {
    this.auth(this.authType, {
      username: this.username,
      password: this.password,
      token: this.OAuth
    });

    // put loading gifs
    var issues = this.github.getIssues(this.owner, this.repo);

    //          options, callback
    issues.list({}, this.parseIssues);

  },

  /**
   * callback for the issues.list()
   * @param  {Object} errors errors from the list method (if any)
   * @param  {Array} issues array of issues that were returned from the Github API
   */
  parseIssues: function(errors, issues) {
    var issueId,
      $this,
      username;

    $('.pulls-list-group .list-group-item').each(function(issueCount) {
      $this = $(this);
      issueId = $this.find('.list-group-item-number').text();

      username = issues[issueCount].assignee.login;

      $this.find('.list-group-item-meta').append('<li>Assigned to <a href="/' + username + '">' + username + '</a></li>');
    });
  },

  /**
   * Github authentication
   * @param  {string} authType    - "basic" or "OAuth"
   * @param  {Object} credentials - if authType is basic:
   *                                { username: "USERNAME HERE", password: "PASSWORD HERE" }
   *                              if authType = OAuth:
   *                                { token: "OAUTH_TOKEN" }
   */
  auth: function(authType, credentials) {
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
      this.github = new Github({
        username: credentials.username,
        password: credentials.password,
        auth: "basic"
      });
      return;
    }
    if (authType.toLowerCase() === 'oauth') {
      if (!credentials.token) {
        throw "OAuth token is required";
      }
      this.github = new Github({
        token: credentials.token,
        auth: "oauth"
      });
      return;
    }
    throw "Error";
  }
};
$(function() {
  YOLO.swag();
})
