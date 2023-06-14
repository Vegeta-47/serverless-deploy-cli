#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import shell from 'shelljs'

let playerName;
let env;
let version
let awsProfile;
let pushToGit;
let gitBranch;
let gitComment;
let selectProjects
// let deployAllServices

let currentBranch = 'master'
// let currentBranch = shell.exec(`git branch --show-current`).stdout

let gitLabUrls = [
  
]

async function welcome() { console.log(gradient.pastel("Serverless Deploy CLI")) }

async function deploy() {

  let data = shell.exec(`git branch --show-current`)
  console.log("data.stdout", data.stdout)
  process.exit(0);

  console.log(chalk.blue(`Deploying to ${env} environment with AWS Profile ${awsProfile} \n`));

  let command = `serverless deploy --stage ${env.toLowerCase()} --aws-profile ${awsProfile} -v`

  let versionCommand = `npm version ${version.toLowerCase()}`

  // let gitAddCommand = `git add .`
  // let gitCommitCommand = `git commit -m "${gitComment}"`
  // let gitPushCommand = `git push origin ${gitBranch}`




  shell.exec(command)
  shell.exec(versionCommand)
  shell.exec(`git add .`)
  shell.exec(`git commit -m "${gitComment}"`)
  shell.exec(`git push origin ${gitBranch}`)
  process.exit(0);

}

async function deployAllServices() {

  let data = shell.exec(`git branch --show-current`)
  console.log("data.stdout", data.stdout)

  console.log(chalk.blue(`Deploying to ${env} environment with AWS Profile ${awsProfile} \n`));

  let command = `serverless deploy --stage ${env.toLowerCase()} --aws-profile ${awsProfile} --verbose`

  let versionCommand = `npm version ${version.toLowerCase()}`

  // let gitAddCommand = `git add .`
  // let gitCommitCommand = `git commit -m "${gitComment}"`
  // let gitPushCommand = `git push origin ${gitBranch}`

  shell.exec('mkdir tempDeploy')
  shell.cd('tempDeploy')

  for (const x of gitLabUrls) {
    shell.exec(`git clone ${x.gitUrl}`)
    shell.cd(x.fileName)
    // shell.exec(`git checkout master`)
    shell.exec(`npm i`)
    shell.exec(command)
    shell.cd('..')
  }

  // let deployStatus = gitLabUrls.map(async (x) => {

  // })

  // console.log('deployStatus', deployStatus)
  process.exit(0);

}

async function askEnv() {
  const answers = await inquirer.prompt({
    name: 'selectEnvironment',
    type: 'list',
    message: 'Select Environment to deploy\n',
    choices: [
      'Development',
      'Dev2',
      'QA',
      'QA2',
      'Production',
    ],
  });

  env = answers.selectEnvironment;

}

async function askVersion() {
  const answers = await inquirer.prompt({
    name: 'version',
    type: 'list',
    message: 'Select Version\n',
    choices: [
      'Patch',
      'Minor',
      'Major'
    ],
  });

  version = answers.version;

}

async function askAwsProfile() {

  const answers = await inquirer.prompt({
    name: 'awsProfile',
    type: 'input',
    message: 'Enter AWS Profile Name',
    default() {
      return 'default';
    },
  });

  awsProfile = answers.awsProfile;
}

async function askPushToGit() {
  const answers = await inquirer.prompt({
    name: 'pushToGit',
    type: 'confirm',
    message: `Do you want to Push to Git?\n`
  });

  pushToGit = answers.pushToGit;
}
async function askToSelectProjects() {
  const answers = await inquirer.prompt({
    name: 'selectProjects',
    type: 'checkbox',
    message: `Select Projects you want to deploy\n`,
    
    choices: gitLabUrls
  });

  selectProjects = answers.selectProjects;
  console.log('selectProjects', selectProjects)
}

async function askConfirmation() {
  const answers = await inquirer.prompt({
    name: 'confirm',
    type: 'confirm',
    message: `You are about to deploy ${currentBranch} to ${env}. Do you want to continue?\n`
  });

  let confirm = answers.confirm;
  if (!confirm) process.exit(0);
}

async function askGitBranch() {
  const answers = await inquirer.prompt({
    name: 'gitBranch',
    type: 'input',
    message: 'Enter the Branch name.',
  });

  gitBranch = answers.gitBranch;
}

async function askGitComment() {
  const answers = await inquirer.prompt({
    name: 'gitComment',
    type: 'input',
    message: 'Enter the git comment.',
    default() {
      return `Deployed to ${env}`;
    },
  });

  gitComment = answers.gitComment;
}

console.clear();
await welcome();
// await askToSelectProjects();
await askEnv();
await askVersion();
await askAwsProfile();
await askPushToGit();
if (pushToGit) {
  await askGitBranch();
  await askGitComment();
}

await askConfirmation();
deployAllServices()
// deploy();