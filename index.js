const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const files = core.getInput('files').split(' ');
const repository = process.env['GITHUB_REPOSITORY']

const owner = repository.split('/')[0]
const repo = repository.split('/')[1]
const ref = core.getInput('branch');

function getContent(path) {
    octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
    }).then(data => {
        if (Array.isArray(data.data)) {
            data.data.forEach(fileData => getContent(fileData.path))
        } else {
            saveContent(data.data)
        }
    })
}

function saveContent(data) {
    const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');
    if (data.path.includes('/')) {
        let foldersPath = data.path.split('/')
        foldersPath.pop()
        fs.mkdirSync(foldersPath.join('/'), { recursive: true });
    }
    fs.writeFile(data.path, fileContent, err => { if (err) throw err });
}

files.forEach(file =>{
    getContent(file)
})
