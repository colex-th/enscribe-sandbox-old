import { execSync } from 'child_process';
import { existsSync } from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import config, { AppType } from './config';

const apps = Object.keys(config);
const { argv } = yargs(hideBin(process.argv));
const argKeys = Object.keys(argv);

const cmd = (command: string, cwd?: string, safely?: boolean) => {
  try {
    console.info(cwd ? `./${cwd}/ ${command}` : command);
    execSync(command, { cwd });
  } catch (error) {
    if (safely) console.error(error.message);
    else throw error;
  }
};

const each = (fn: (key: string, app: AppType) => void) => {
  apps.forEach((key) => fn(key, config[key]));
};
const check = (flag: string, run: () => void) => {
  if (argKeys.includes(flag)) run();
};

check('clean', () => {
  each((key) => cmd(`rm -rf ${key}`));
});

check('download', () => {
  each((key, app) => {
    if (!existsSync(key)) cmd(`git clone ${app.repo} ${key}`);
  });
});

check('build', () => {
  each((key, app) => {
    if (app.build) app.build.forEach((command) => cmd(command, key));
  });
});

check('checkout', () => {
  each((key) => cmd(`git checkout ${argv.checkout}`, key));
});

check('pull', () => {
  each((key) => cmd(`git pull`, key));
});

check('branch', () => {
  each((key) => cmd(`git checkout -b ${argv.branch}`, key));
});

check('delete', () => {
  each((key) => cmd(`git branch -D ${argv.delete}`, key));
});
