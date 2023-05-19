import {
  getButtonContainers,
  oneMoreButton,
  smartClickAllButtons
} from 'midkit';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 10000));
}

async function main() {
  await initialize();
  const buttonContainers = getButtonContainers();
  for (const buttonContainer of buttonContainers) {
    const clickAllButton = oneMoreButton(buttonContainer);
    clickAllButton.textContent = 'ALL';
    clickAllButton.addEventListener('click', () => {
      smartClickAllButtons(buttonContainer);
    })
  }
}

(function () {
  main();
}());
