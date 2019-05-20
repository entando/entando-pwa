// based on https://github.com/tszarzynski/cra-append-sw/blob/master/index.js

const fs = require('fs');

const BUILD_SW_FILE_PATH = 'build/service-worker.js';

function read(entry) {
  return new Promise((resolve, reject) => {
    fs.readFile(entry, 'utf8', (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

function append(code, filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }

      const result = data + code;

      fs.writeFile(filePath, result, 'utf8', error => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  });
}

read('src/swAddendum.js').then(result => append(result, BUILD_SW_FILE_PATH));
