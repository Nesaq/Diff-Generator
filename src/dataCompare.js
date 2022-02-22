import _ from 'lodash';

const treeDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
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
  });
};

const buildTree = (obj1, obj2) => ({ type: 'root', children: treeDiff(obj1, obj2) });

export default buildTree;
