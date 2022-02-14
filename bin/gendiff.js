#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program.version('0.0.1', '-v, --vers', 'output the current version')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('filepath1 filepath2')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });
program.parse();
