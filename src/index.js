import { readFileSync } from 'fs';
import path from 'path';
import treeDiff from './dataCompare.js';
import parser from './parser.js';
import stylish from './formatters/stylish.js';

const gendiff = (filepath1, filepath2, defaultFormatter = 'stylish') => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);

  const data1 = readFileSync(pathOne);
  const data2 = readFileSync(pathTwo);

  const extOne = path.extname(filepath1);
  const extTwo = path.extname(filepath2);

  const obj1 = parser(data1, extOne);
  const obj2 = parser(data2, extTwo);

  const result = treeDiff(obj1, obj2);
  if (defaultFormatter === 'stylish') {
    return stylish(result);
  }
  return stylish(result);
};
export default gendiff;
