const fs = require('fs').promises;
const path = require('path');
const sv = require('semver');

const packName = 'snow-console';
const packDisplayName = 'SNOW Console';
const description = 'ServiceNow tool for testing and development in ServiceNow';
const icon = 'images/icon-canary.png';

const release = process.argv.slice(2)[0];

let updatePackageJSON = async function () {
    let packagePath = path.join('package.json');
    var packageJSON = await fs.readFile(packagePath);
    let package = JSON.parse(packageJSON.toString());

    let newVer = sv.inc(package.canaryVersion, release);

    package.version = newVer;
    package.canaryVersion = newVer;

    package.name = packName;
    package.displayName = packDisplayName;
    package.description = description;
    package.icon = icon;

    fs.writeFile(packagePath, JSON.stringify(package, null, 4));

}

let moveFiles = async function () {
    await fs.unlink('README.md');
    await fs.copyFile('README-canary.md', 'README.md');
}

updatePackageJSON();

moveFiles();
