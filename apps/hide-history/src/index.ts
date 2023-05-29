import { getHistoryBlocksWithTitle } from 'chatkit/chatgpt'
import { useOption } from './useOption';

type HideMapType = {
  [key: string]: boolean;
};

async function initialize() {
  await new Promise(resolve => window.addEventListener('load', resolve));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  await initialize();

  const hideToday = useOption('hide_today', 'Hide Today', false);
  const hideYesterday = useOption('hide_yesterday', 'Hide Yesterday', false);
  const hidePrevious7Days = useOption('hide_previous_7_days', 'Hide Previous 7 Days', true);
  const hidePrevious30Days = useOption('hide_previous_30_days', 'Hide Previous 30 Days', true);

  const hideMap: HideMapType = new Proxy<HideMapType>({
    'Today': hideToday.value,
    'Yesterday': hideYesterday.value,
    'Previous 7 Days': hidePrevious7Days.value,
    'Previous 30 Days': hidePrevious30Days.value,
  }, {
    get: (target: HideMapType, name: string) => target[name] ?? true
  });

  while (true) {
    if (getHistoryBlocksWithTitle().length > 1) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  getHistoryBlocksWithTitle()
    .filter(block => hideMap[block.title])
    .forEach(historyBlock => historyBlock.block.style.display = 'none');
}

(function () {
  main();
}());
