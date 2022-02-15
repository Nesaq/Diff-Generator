import yaml from 'js-yaml';

const parseExtension = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong extension: '${extension}'`);
  }
};

export default parseExtension;
