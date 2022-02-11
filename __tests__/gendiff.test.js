import * as fs from 'fs';
// import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';
import gendiff from '../src/gendiff.js';

const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let json1;
let json2;
let yaml1;
let yaml2;
let expected;

beforeAll(() => {
  json1 = readFile('file1.json');
  json2 = readFile('file2.json');
  yaml1 = readFile('file1.yml');
  yaml2 = readFile('file2.yml');
  expected = readFile('expectedResult.txt');
});

describe('gendiff', () => {
  test('Json Diff files', () => {
    const file1ToObj = JSON.parse(json1);
    const file2ToObj = JSON.parse(json2);
    const result = gendiff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });

  test('YML Diff files', () => {
    const file1ToObj = yaml.load(yaml1);
    const file2ToObj = yaml.load(yaml2);
    const result = gendiff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });
});
