import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');

const stylish = readFile('stylish.txt');
const plainFormat = readFile('plain.txt');
const jsonFormat = readFile('json.txt');

describe('tests for diff generation between two files', () => {
  test.each([
    ['stylish', json1, json2, stylish],
    ['stylish', yml1, yml2, stylish],
    ['plain', json1, json2, plainFormat],
    ['json', json1, json2, jsonFormat],
  ])('genDiff compares file1 and file2 using %s for expected result', (formatName, file1, file2, expectedResult) => {
    expect(genDiff(file1, file2, formatName)).toBe(expectedResult);
  });
});
