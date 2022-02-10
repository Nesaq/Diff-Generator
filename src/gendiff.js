import _ from 'lodash';
import { readFileSync } from 'fs';
import * as path from 'path';

const gendiff = (filepath1, filepath2) => {
  const pathOne = path.resolve(filepath1);
  const pathTwo = path.resolve(filepath2);
  const jsonOne = readFileSync(pathOne);
  const jsonTwo = readFileSync(pathTwo);
  const data1 = JSON.parse(jsonOne);
  const data2 = JSON.parse(jsonTwo);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const operators = ['+', '-'];

  // eslint-disable-next-line consistent-return
  const getDiff = (key) => {
    if (!_.has(data2, key)) {
      return `  ${operators[1]} ${key}: ${data1[key]}`;
    } if (!_.has(data1, key)) {
      return `  ${operators[0]} ${key}: ${data2[key]}`;
    } if (data1[key] !== data2[key]) {
      return `  ${operators[1]} ${key}: ${data1[key]}\n  ${operators[0]} ${key}: ${data2[key]}`;
    } if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }
  };
  const getDiffString = sortedKeys.map(getDiff).join('\n');
  return `{\n${getDiffString}\n}`;
};
export default gendiff;