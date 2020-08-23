const core = require('@actions/core');
const http = require('http');
const fs = require('fs');

const files = core.getInput('files');
const repository = process.env['GITHUB_REPOSITORY']

function dowloadFile(fileName) {
    const file = fs.createWriteStream(fileName);
    http.get("https://raw.githubusercontent.com/" + repository + '/master/' + fileName, function(response) {
        response.pipe(file);
    });
}

for (let file of files) {
    dowloadFile(file);
}
