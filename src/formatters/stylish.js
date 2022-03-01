import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const result = _.keys(value).map((key) => {
    const childrenValue = value[key];
    return `${getIndent(depth)}  ${key}: ${stringify(childrenValue, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n${getIndent(depth - 1)}  }`;
};

const stylish = (node, depth = 1) => {
  switch (node.type) {
    case 'nested':
      return `${getIndent(depth)}  ${node.key}: {\n${node.children.map((child) => stylish(child, depth + 1)).join('\n')}\n${getIndent(depth)}  }`;
    case 'added':
      return `${getIndent(depth)}+ ${node.key}: ${stringify(node.children, depth + 1)}`;
    case 'deleted':
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.children, depth + 1)}`;
    case 'changed':
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.children, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.children2, depth + 1)}`;
    case 'unchanged':
      return `${getIndent(depth)}  ${node.key}: ${stringify(node.children, depth + 1)}`;
    case 'root':
      return `{\n${(node.children.map((obj) => stylish(obj, depth))).join('\n')}\n}`;
    default:
      throw new Error(`wrong type ${node.type}`);
  }
};

export default stylish;
