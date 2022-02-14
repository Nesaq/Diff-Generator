import _ from 'lodash';

// const treeDiff = (obj1, obj2) => {
//   const keys1 = _.keys(obj1);
//   const keys2 = _.keys(obj2);
//   const keys = _.union(keys1, keys2);
//   const sortedKeys = _.sortBy(keys);

//   const operators = {
//     minus: '-',
//     plus: '+',
//   };

//   // eslint-disable-next-line consistent-return
//   const getDiff = (key) => {
//     if (!_.has(obj2, key)) {
//       return `  ${operators.minus} ${key}: ${obj1[key]}`;
//     } if (!_.has(obj1, key)) {
//       return `  ${operators.plus} ${key}: ${obj2[key]}`;
//     } if (obj1[key] !== obj2[key]) {
// eslint-disable-next-line max-len
//       return `  ${operators.minus} ${key}: ${obj1[key]}\n  ${operators.plus} ${key}: ${obj2[key]}`;
//     } if (obj1[key] === obj2[key]) {
//       return `    ${key}: ${obj1[key]}`;
//     }
//   };
//   const getDiffString = sortedKeys.map(getDiff).join('\n');
//   return `{\n${getDiffString}\n}`;
// };

const treeDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const getDiff = (key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key, children: treeDiff(obj1[key], obj2[key]), type: 'nested',
      };
    }
    if (!_.has(obj1, key)) return { key, children: obj2[key], type: 'added' };

    if (!_.has(obj2, key)) return { key, children: obj1[key], type: 'deleted' };

    if (obj1[key] !== obj2[key]) {
      return {
        key, children: obj1[key], children2: obj2[key], type: 'changed',
      };
    }
    return { key, children: obj1[key], type: 'unchanged' };
  };
  return sortedKeys.map(getDiff);
};
export default treeDiff;
