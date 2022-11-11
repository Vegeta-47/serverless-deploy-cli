#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import shell from 'shelljs'

let playerName;
let env;
let awsProfile;
let pushToGit;
let gitBranch;
let gitComment;

async function welcome() { console.log(gradient.pastel("Serverless Deploy CLI")) }

async function deploy() {

  console.log(chalk.red(`Deploying to ${env} environment with AWS Profile ${awsProfile} \n`));
  
  let command = `serverless deploy --stage ${env.toLowerCase()} --aws-profile ${awsProfile} -v`
  
  let gitCommand = `git add .
  git commit -m ${gitComment}
  git push origin ${gitBranch}
  `
  
  shell.exec(command)
  shell.exec(gitCommand)
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
await askAwsProfile();
await askPushToGit();
if (pushToGit) {
  await askGitBranch();
  await askGitComment();
}
deploy();