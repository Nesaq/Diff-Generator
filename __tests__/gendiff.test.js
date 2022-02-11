import * as fs from 'fs';
// eslint-disable-next-line import/no-duplicates
import path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/no-duplicates
import { dirname } from 'path';
import gendiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filenames) => path.join(__dirname, '..', '__fixtures__', filenames);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// eslint-disable-next-line no-undef
test('check diff fn', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const actual = gendiff(filepath1, filepath2);
  const expectedResult = readFile('expectedResult.txt');
  // eslint-disable-next-line no-undef
  expect(actual).toEqual(expectedResult);
});
