import { initInfoDivClone } from './infoDiv';
import autoCopyWhenSend from './autoCopyWhenSend';
import sendLaterOrForceSend from './sendLaterOrForceSend';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
  initInfoDivClone();
}

async function main() {
  await initialize();
  autoCopyWhenSend();
  sendLaterOrForceSend();
}

(function () {
  main();
}());
