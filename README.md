### Hexlet tests and linter status:
[![Actions Status](https://github.com/Nesaq/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Nesaq/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/d0f5d780f47a393e19c5/maintainability)](https://codeclimate.com/github/Nesaq/frontend-project-lvl2/maintainability)

[![NodeJS](https://github.com/Nesaq/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Nesaq/frontend-project-lvl2/actions/workflows/nodejs.yml)

[![Test Coverage](https://api.codeclimate.com/v1/badges/d0f5d780f47a393e19c5/test_coverage)](https://codeclimate.com/github/Nesaq/frontend-project-lvl2/test_coverage)


# Difference Builder

## Installation

```
    make install
    npm link

```
### Usage & Examples

```
Usage: gendiff [options] <filepath1> <filepath2>

Options:
  -v, --vers           output the current version
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command

```

1. Compare two JSON documents
[![asciicast](https://asciinema.org/a/qUVjXOXZPvsHHIFbpx9fmvdgB.svg)](https://asciinema.org/a/qUVjXOXZPvsHHIFbpx9fmvdgB)

2. Compare two YAML documetns
[![asciicast](https://asciinema.org/a/ytxbJN4ObgcFosxPssYEHOQ05.svg)](https://asciinema.org/a/ytxbJN4ObgcFosxPssYEHOQ05)

3. Compare two different extention documetns (JSON and YML) with `stylish` format option by default 
[![asciicast](https://asciinema.org/a/6kDgMyOjyyleNfEuUswWCeyGH.svg)](https://asciinema.org/a/6kDgMyOjyyleNfEuUswWCeyGH)

4. Compare two documents by `plain` format.
```
Usage: `gendiff -f ***plain*** <filepath1> <filepath2>
``` 
[![asciicast](https://asciinema.org/a/THEJXpp6edkha9eLzUyI8wXoY.svg)](https://asciinema.org/a/THEJXpp6edkha9eLzUyI8wXoY)

5. Gendiff json format
```
Usage: `gendiff -format ***json*** <filepath1> <filepath2>
```
[![asciicast](https://asciinema.org/a/JQ2oCV67YGMZ5bonHKPdRnprw.svg)](https://asciinema.org/a/JQ2oCV67YGMZ5bonHKPdRnprw)
