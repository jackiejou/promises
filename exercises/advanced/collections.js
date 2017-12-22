var fs = require('fs');
var Promise = require('bluebird');
/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var readFirstLineAsync = function(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve((data + '').split('\n')[0]);
      }
    });
  });
};

var writeLinesToFileAsync = function(lines, writePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(writePath, lines.join('\n'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log('File Written!'));
      }
    });
  });
};

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // loop through filepaths, and read the files
  // get the first line of each files and store them in a new array
  // join array with \n and write it at writepath

  return Promise.all(filePaths.map(readFirstLineAsync))
  .then(firstLines => {
    return writeLinesToFileAsync(firstLines, writePath);
  })
  .catch(err => {
    console.log('Error in promise chain');
  });

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};