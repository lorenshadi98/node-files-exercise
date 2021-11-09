const fs = require('fs');
function cat(file_path) {
  fs.readFile(file_path, 'utf8', function (err, data) {
    if (err) {
      console.log('ERROR OCCURED DURING CAT OPERATION', err);
      process.kill(1);
    }
    console.log('successfully read data: ', data);
  });
}
const argv = process.argv;
cat(argv[2]);
