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

const stylish = readFile('expectedResult.txt');
const plainFormat = readFile('plain.txt');
const jsonFormat = readFile('json.txt');

test.each([
  { a: json1, b: json2, expected: stylish },
  { a: json1, b: yml2, expected: stylish },
  { a: yml1, b: json2, expected: stylish },
  { a: yml1, b: yml2, expected: stylish },
])('Stylish format test', ({ a, b, expected }) => {
  expect(genDiff(a, b, 'stylish')).toBe(expected);
});

test.each([
  { a: json1, b: json2, expected: plainFormat },
  { a: json1, b: yml2, expected: plainFormat },
  { a: yml1, b: json2, expected: plainFormat },
  { a: yml1, b: yml2, expected: plainFormat },
])('Plain format test', ({ a, b, expected }) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  { a: json1, b: json2, expected: jsonFormat },
  { a: json1, b: yml2, expected: jsonFormat },
  { a: yml1, b: json2, expected: jsonFormat },
  { a: yml1, b: yml2, expected: jsonFormat },
])('JSON format test', ({ a, b, expected }) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
