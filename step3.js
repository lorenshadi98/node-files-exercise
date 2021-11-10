const fs = require('fs');
const axios = require('axios');
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
function catWrite(outputFile, inputFile) {
  fs.copyFile(inputFile, outputFile, (error) => {
    if (error) {
      console.error(error);
      process.kill(1);
    }

    console.log('Cat Copied Successfully!');
  });
}

async function webCat(link) {
  try {
    let res = await axios.get(link);
    console.log('res is ', res.data);
  } catch (err) {
    console.log('ERROR occured inside WEB CAT', err);
  }
}

async function webCatWrite(outputFile, link) {
  try {
    const content = await axios.get(link);

    fs.writeFile(outputFile, content.data, function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('Successfully wrote to file. (WebCatWrite)');
    });
  } catch {
    console.log('Error occured during webCatWrite');
  }
}

if (argv[2] == '--out') {
  if (argv[4].startsWith('http')) {
    webCatWrite(argv[3], argv[4]);
  } else {
    catWrite(argv[3], argv[4]);
  }
} else {
  if (argv[2].startsWith('http')) {
    webCat(argv[2]);
  } else {
    cat(argv[2]);
  }
}
