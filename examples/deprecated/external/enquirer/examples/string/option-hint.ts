// @ts-nocheck

'use strict';

const { StringPrompt } = require('enquirer');
const prompt = new StringPrompt({
  message: 'What is your username?',
  hint: '...start typing'
});

prompt.run()
  .then(answer => console.log('ANSWER:', answer))
  .catch(console.log);
