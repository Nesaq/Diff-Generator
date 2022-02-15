import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const makeNode = (nodes) => {
  const iter = (node, nameKey) => {
    const currentKey = `${nameKey}${node.key}`;
    switch (node.type) {
      case 'nested':
        return node.children.map((child) => iter(child, `${currentKey}.`)).join('');
      case 'added':
        return `Property '${currentKey}' was added with value: ${stringify(node.children)}\n`;
      case 'deleted':
        return `Property '${currentKey}' was removed\n`;
      case 'changed':
        return `Property '${currentKey}' was updated. From ${stringify(node.children)} to ${stringify(node.children2)}\n`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`wrong ${node.type}`);
    }
  };

  return iter(nodes, '');
};

const plain = (nodes) => {
  const lines = nodes.map((node) => makeNode(node));
  return lines.join('').trim();
};

export default plain;
