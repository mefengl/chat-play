import {
  getButtonContainers,
  getButtons,
  onScrollerInnerChange,
  oneMoreButton,
  smartClickAllButtons
} from 'midkit';

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 6000));
}

function addClickAllButton(root: Element | undefined) {
  const buttonContainers = getButtonContainers(root);
  for (const buttonContainer of buttonContainers) {
    if (getButtons(buttonContainer).length < 4) continue;
    const clickAllButton = oneMoreButton(buttonContainer);
    clickAllButton.textContent = 'ALL';
    clickAllButton.addEventListener('click', () => {
      smartClickAllButtons(buttonContainer);
    })
  }
}

async function main() {
  await initialize();
  addClickAllButton(undefined);
  onScrollerInnerChange(addClickAllButton);
}

(function () {
  main();
}());
