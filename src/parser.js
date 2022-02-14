import yaml from 'js-yaml';

const parseExtension = (files, extension) => {
  let parser;
  if (extension === '.json') {
    parser = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parser = yaml.load;
  }
  return parser(files);
};

export default parseExtension;
