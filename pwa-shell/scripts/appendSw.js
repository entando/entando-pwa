// based on https://github.com/tszarzynski/cra-append-sw/blob/master/index.js

const fs = require('fs');

const SW_ADDENDUM_FILE_PATH = 'src/swAddendum.js';
const BUILD_SW_FILE_PATH = 'build/service-worker.js';
const CHARSET = 'utf8';

function read(entry) {
  return new Promise((resolve, reject) => {
    fs.readFile(entry, CHARSET, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

function append(code, filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, CHARSET, (error, data) => {
      if (error) {
        reject(error);
      }

      const result = data + code;

      fs.writeFile(filePath, result, CHARSET, error => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  });
}

read(SW_ADDENDUM_FILE_PATH).then(result => append(result, BUILD_SW_FILE_PATH));
