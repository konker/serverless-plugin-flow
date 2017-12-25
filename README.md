# serverless-plugin-flow

A plugin to automatically run the [Flow static type checker](https://flow.org/)

## Installation
In your Serverless project
```bash
$ npm install --save-dev serverless-plugin-flow
```

## Usage
```yaml
plugins:
  - serverless-plugin-git-variables
```

The flow checker can be invoked explicitly:
```bash
$ serverless flow
```

The flow checker will also be automatically invoked:
- before deployment
- before invoke local

