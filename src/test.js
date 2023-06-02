// get all directories in the current directory
const fs = require('fs');

const curDir = __dirname;

// get all files in the current directory
fs.readdir(curDir, (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});

