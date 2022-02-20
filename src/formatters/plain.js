import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree) => {
  const format = (nodes, parent) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'nested':
          return `${format(node.children, property)}`;
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.children)}`;
        case 'deleted':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(node.children)} to ${stringify(node.children2)}`;
        default:
          throw new Error(`wrong ${node.type}`);
      }
    }).join('\n');
  return format(tree, 0);
};
export default plain;
