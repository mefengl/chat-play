import { chatgpt } from '@mefengl/chatkit';
import { send } from '@mefengl/chatkit/chatgpt'

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  // Your code here
  chatgpt.send('hello');
  await chatgpt.waitForIdle();
  send('hello from selctive import!');
}

(function () {
  main();
}());
