import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (node, path) => {
  const property = path ? `${path}.${node.key}` : node.key;
  switch (node.type) {
    case 'nested':
      return (node.children.map((obj) => plain(obj, property))).filter((str) => str !== undefined).join('\n');
    case 'added':
      return `Property '${property}' was added with value: ${stringify(node.children)}`;
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${stringify(node.children)} to ${stringify(node.children2)}`;
    case 'unchanged':
      return undefined;
    case 'root':
      return (node.children.map((obj) => plain(obj, property))).join('\n');
    default:
      throw new Error(`wrong ${node.type}`);
  }
};
export default plain;
