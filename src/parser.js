import yaml from 'js-yaml';

const parseExt = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      return 'Try again :)';
  }
};
export default parseExt;
