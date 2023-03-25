import chatkit from 'chatkit';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  // Your code here
  chatkit.send('hello!');
}

(function () {
  main();
}());
