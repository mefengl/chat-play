import { initInfoDivClone, getInfoDivClone } from './chatgpt/infoDiv';
import autoCopyWhenSend from './autoCopyWhenSend';
import sendLaterOrForceSend from './sendLaterOrForceSend';

async function initialize() {
  await new Promise((r) => window.addEventListener('load', r));
  await new Promise((r) => setTimeout(r, 1000));
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
