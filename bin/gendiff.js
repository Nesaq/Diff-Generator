#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program.version('0.0.1', '-v, --vers', 'output the current version')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('filepath1 filepath2')
  .action((filepath1, filepath2) => {
    const diffTree = gendiff(filepath1, filepath2, program.opts().defaultValue);
    console.log(diffTree);
  });
program.parse();
