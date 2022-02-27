import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (nodes, path) => {
  const property = path ? `${path}.${nodes.key}` : nodes.key;
  switch (nodes.type) {
    case 'nested':
      return (nodes.children.filter((node) => node.type !== 'unchanged').map((node) => plain(node, property)).join('\n'));
    case 'added':
      return `Property '${property}' was added with value: ${stringify(nodes.children)}`;
    case 'deleted':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${stringify(nodes.children)} to ${stringify(nodes.children2)}`;
    case 'root':
      return (nodes.children.filter((node) => node.type !== 'unchanged').map((node) => plain(node, property)).join('\n'));
    default:
      throw new Error(`wrong ${nodes.type}`);
  }
};
export default plain;
