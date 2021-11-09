const fs = require('fs');
const axios = require('axios');

function cat(file_path) {
  // opens non URL file paths
  fs.readFile(file_path, 'utf8', function (err, data) {
    if (err) {
      console.log('ERROR OCCURED DURING CAT OPERATION', err);
      process.kill(1);
    }
    console.log('successfully read data: ', data);
  });
}
async function webCat(link) {
  // designed to open URL paths
  try {
    let res = await axios.get(link);
    console.log('res is ', res.data);
  } catch (err) {
    console.log('ERROR occured inside WEB CAT', err);
  }
}

const argv = process.argv;
if (argv[2].startsWith('http')) {
  webCat(argv[2]);
} else {
  cat(argv[2]);
}
