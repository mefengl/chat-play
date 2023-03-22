import startInfiniteLoop from "./infiniteLoop";

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  startInfiniteLoop();
}

(function () {
  main();
}());
