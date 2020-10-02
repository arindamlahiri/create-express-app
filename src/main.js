import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const copy = promisify(ncp);

async function copyTemplateFiles(boilerplateDir) {
 return copy(boilerplateDir, process.cwd(), {
   clobber: false,
 });
}

async function initGit() {
    const result = await execa('git', ['init'], {
      cwd: process.cwd()
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

export async function createProject() {
 
 const currentFileUrl = import.meta.url;
 const boilerplateDir = path.resolve(
   new URL(currentFileUrl).pathname.substring(1),
   '../../boilerplate'
 );

 const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(boilerplateDir),
    },
    {
      title: 'Initialize git',
      task: () => initGit()
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: process.cwd(),
        })
    },
  ]);
 
  await tasks.run();

 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}