import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { genDiff } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filenames) => readFileSync(getFixturePath(filenames), 'utf8');

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
  test('JSON Diff files', () => {
    const file1ToObj = JSON.parse(json1);
    const file2ToObj = JSON.parse(json2);
    const result = genDiff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });

  test('YML Diff files', () => {
    const file1ToObj = yaml.load(yaml1);
    const file2ToObj = yaml.load(yaml2);
    const result = genDiff(file1ToObj, file2ToObj);
    expect(result).toEqual(expected);
  });
});
