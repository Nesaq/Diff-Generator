import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const mark = {
  plus: '+',
  minus: '-',
  unchanged: ' ',
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const result = _.keys(value).map((key) => {
    const childrenValue = value[key];
    return `${getIndent(depth)}  ${key}: ${stringify(childrenValue, depth + 1)}\n`;
  });

  return `{\n${result.join('')}${getIndent(depth - 1)}  }`;
};
const checkDiff = (nodes) => {
  const iter = (node, depth = 1) => {
    switch (node.type) {
      case 'nested':
        return `\n${getIndent(depth)}  ${node.key}: {${node.children.map((child) => iter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
      case 'added':
        return `\n${getIndent(depth)}${mark.plus} ${node.key}: ${stringify(node.children, depth + 1)}`;
      case 'deleted':
        return `\n${getIndent(depth)}${mark.minus} ${node.key}: ${stringify(node.children, depth + 1)}`;
      case 'changed':
        return `\n${getIndent(depth)}${mark.minus} ${node.key}: ${stringify(node.children, depth + 1)}\n${getIndent(depth)}${mark.plus} ${node.key}: ${stringify(node.children2, depth + 1)}`;
      case 'unchanged':
        return `\n${getIndent(depth)}  ${node.key}: ${stringify(node.children, depth + 1)}`;
      default:
        throw new Error(`wrong type ${node.type}`);
    }
  };
  return iter(nodes);
};
const stylish = (nodes) => {
  const lines = nodes.map((node) => checkDiff(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;