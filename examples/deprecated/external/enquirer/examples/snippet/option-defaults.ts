// @ts-nocheck

'use strict';

const { Snippet } = require('enquirer');
const prompt = new Snippet({
  name: 'username',
  message: 'Fill out the fields in package.json',
  hint: '...Start typing',
  defaults: { name: 'awesome-lib', version: '0.1.0', license: 'MIT' },
  template: `{
  "name": "{{name}}",
  "description": "{{description}}",
  "version": "{{version}}",
  "homepage": "https://github.com/{{username}}/{{name}}",
  "author": "{{author_name}} (https://github.com/{{username}})",
  "repository": "{{username}}/{{name}}",
  "bugs": {
    "url": "https://github.com/{{username}}/{{name}}/issues"
  },
  "engines": {
    "node": ">=4"
  },
  "license": "{{license}}",
  "scripts": {
    "test": "mocha"
  },
  "keywords": []
}
`
});

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
