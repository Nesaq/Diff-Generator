import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check diff fn', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const actual = gendiff(filepath1, filepath2);
  const expectedResult = readFile('expectedResult.txt');
  expect(actual).toEqual(expectedResult);
});
