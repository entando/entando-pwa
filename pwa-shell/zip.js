console.log('Starting compression...\n');

var path = __dirname + '/pwa.zip';

var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(path);
var archive = archiver('zip', {
  zlib: { level: 9 }
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('file not found');
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

output.on('finish', function() {
  console.log('Compression completed. Created ' + path + '\n');
});

archive.pipe(output);

archive.directory('build/', 'build');

archive.finalize();
