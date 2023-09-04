const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const files = core.getInput('files', { required: true }).split(' ');
const repository = process.env['GITHUB_REPOSITORY']

const owner = repository.split('/')[0]
const repo = repository.split('/')[1]
const ref = core.getInput('branch');

function getContentParams() {
    let params = { owner, repo }

    if (ref) { params.ref = ref }
    return params;
}

async function getContent(path) {
    const { data } = await octokit.rest.repos.getContent({ path, ...getContentParams() });
    if (Array.isArray(data)) {
        data.forEach(fileData => getContent(fileData.path))
    } else {
        let fileContent = Buffer.from(data.content, 'base64').toString('utf-8');
        if (fileContent.length === 0 && data.size > 0) {
            // File was over json content byte limit.
            // Use the Raw endpoint will provide files data up to 10MB.
            fileContent = await getRawFile(path);
        }
        saveContent({ path, fileContent })
    }
}



async function getRawFile(path) {
    const { data } = await octokit.rest.repos.getContent({
        ...getContentParams(),
        path,
        mediaType: {
            format: "raw"
        },
    });

    return data;
}


function saveContent({ path, fileContent }) {
    if (path.includes('/')) {
        const foldersPath = path.split('/')
        foldersPath.pop()
        fs.mkdirSync(foldersPath.join('/'), { recursive: true });
    }
    fs.writeFile(path, fileContent, err => { if (err) throw err });
}

files.forEach(file => {
    getContent(file)
})
