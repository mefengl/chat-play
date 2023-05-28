import { onUrlChange } from '@mefengl/monkit';
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

function addClickAllButtonWithCheck(root: Element | undefined) {
  if (!root?.querySelector('.cloned-button'))
    addClickAllButton(root);
}

async function checkClickAllButtonFiveTimes(root: Element | undefined) {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    addClickAllButtonWithCheck(root);
  }
}

async function addClickAllButtonWithCheckFiveTimes(root: Element | undefined) {
  addClickAllButton(root);
  await checkClickAllButtonFiveTimes(root);
}

async function main() {
  await initialize();
  addClickAllButton(undefined);
  onScrollerInnerChange(addClickAllButtonWithCheckFiveTimes);
  onUrlChange(() => {
    addClickAllButton(undefined);
    onScrollerInnerChange(addClickAllButtonWithCheckFiveTimes);
  });
}

(function () {
  main();
}());
