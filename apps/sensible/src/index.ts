import autoCopyWhenSend from './autoCopyWhenSend';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();
  autoCopyWhenSend();
  document.querySelector("a.underline[href$='release-notes']")?.parentElement?.remove();
  document.querySelector('form')?.previousElementSibling?.remove();
}

(function () {
  main();
}());
