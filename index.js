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

async function welcome() { console.log(gradient.pastel("Serverless Deploy CLI")) }

async function deploy() {

  console.log(chalk.red(`Deploying to ${env} environment with AWS Profile ${awsProfile} \n`));
  
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

async function askEnv() {
  const answers = await inquirer.prompt({
    name: 'selectEnvironment',
    type: 'list',
    message: 'Select Environment to deploy\n',
    choices: [
      'Development',
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
await askEnv();
await askVersion();
await askAwsProfile();
await askPushToGit();
if (pushToGit) {
  await askGitBranch();
  await askGitComment();
}
deploy();