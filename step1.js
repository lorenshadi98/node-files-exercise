const fs = require('fs');

const argv = process.argv;

function cat(file_path) {
  fs.readFile(file_path, 'utf8', function (err, data) {
    if (err) {
      console.log('ERROR OCCURED DURING CAT OPERATION', err);
      process.kill(1);
    }
    console.log('successfully read data: ', data);
  });
}

cat(argv[2]);
