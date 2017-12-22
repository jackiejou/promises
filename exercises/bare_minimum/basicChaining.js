/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGithubProfile = require('./promisification').getGitHubProfileAsync;
var pluckFirstLine = require('./promiseConstructor').pluckFirstLineFromFileAsync;

var writeToFile = function(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log('File written'));
      }
    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODOgit

  // read from readFile
  return pluckFirstLine(readFilePath)
    .then(function(user) {
      return getGithubProfile(user);
    })
    .then(function(html) {
      return writeToFile(writeFilePath, html);
    })
    .catch(function(err) {
      console.log('Error in promise chain');
    });
  // fetch user page
  // write body of response to writeFile
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

 