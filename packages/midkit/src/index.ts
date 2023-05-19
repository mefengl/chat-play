export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getTextarea(): Element | null {
  return document.querySelector('[class^="channelTextArea"]');
}

export function getAttachButton(): HTMLElement | null {
  const textarea = getTextarea();
  if (!textarea) return null;
  return textarea.querySelector('[class^="attachButton"]');
}

export function attachButtonExpanded(): boolean {
  const attachButton = getAttachButton();
  if (!attachButton) return false;
  return attachButton.getAttribute('aria-expanded') === 'true';
}

export function expandAttachButton(): void {
  if (attachButtonExpanded()) return;
  const attachButton = getAttachButton();
  if (!attachButton) return;
  attachButton.click();
}

export function getChannelAttachMenu(): Element | null {
  return document.querySelector('#channel-attach');
}

export function getUploadAFileButton(): Element | null {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return null;
  return channelAttachMenu.querySelector('#channel-attach-upload-file');
}

export function getCreateThreadButton(): Element | null {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return null;
  return channelAttachMenu.querySelector('#channel-attach-THREAD');
}

export function getUseAppsButton(): HTMLElement | null {
  const channelAttachMenu = getChannelAttachMenu();
  if (!channelAttachMenu) return null;
  return channelAttachMenu.querySelector('#channel-attach-SLASH_COMMAND');
}

export async function openUseAppsMenu(): Promise<void> {
  if (!attachButtonExpanded()) expandAttachButton();
  await sleep(500);
  const useAppsButton = getUseAppsButton();
  if (!useAppsButton) return;
  useAppsButton.click();
  await sleep(500);
}

export function getUseAppsMenu(): Element | null {
  const textarea = getTextarea();
  if (!textarea) return null;
  return textarea.querySelector('[class^="autocomplete"]');
}

export function getUseAppsMenuItems(): Element[] | null {
  const useAppsMenu = getUseAppsMenu();
  if (!useAppsMenu) return null;
  const appsMenuRail = useAppsMenu.querySelector('[class^="rail"]');
  if (!appsMenuRail) return null;
  return Array.from(appsMenuRail.querySelectorAll('[role="button"]'));
}

export function getMidjourneyButtonInUseAppsMenu(): Element | undefined {
  const useAppsMenuItems = getUseAppsMenuItems();
  if (!useAppsMenuItems) return;
  return useAppsMenuItems.find(item => item.getAttribute('aria-label') === 'Midjourney Bot');
}

export async function midjourneyBotInstalled(): Promise<boolean> {
  await openUseAppsMenu();
  return !!getMidjourneyButtonInUseAppsMenu();
}

export function getButtonContainers(): Element[] {
  return Array.from(document.querySelectorAll("[id^='message-accessorie'] [class^='children']"));
}

const CLONE_BUTTON_CLASS = 'cloned-button';

export function getButtons(temp: Element): HTMLElement[] {
  const buttons = temp.querySelectorAll('button');
  const originalButtons = Array.from(buttons).filter(button => !button.classList.contains(CLONE_BUTTON_CLASS));
  return originalButtons;
}

export function oneMoreButton(temp: Element): Element {
  const buttons = getButtons(temp);
  const lastButton = buttons[buttons.length - 1];
  const cloneButton = lastButton.cloneNode() as Element;
  cloneButton.classList.add(CLONE_BUTTON_CLASS);
  lastButton.parentNode!.insertBefore(cloneButton, lastButton.nextSibling);
  return cloneButton;
}

export function getSubmitButton(): HTMLElement | null {
  return document.querySelector('button[type="submit"]');
}

export function isSubmitting(): boolean {
  const submitButton = getSubmitButton();
  if (!submitButton) return false;
  return submitButton.getAttribute('aria-busy') === 'true';
}

export async function checkSubmitStatus(): Promise<never> {
  while (true) {
    await sleep(100);
    console.log(isSubmitting()? 'Submitting...' : 'Ready');
  }
}

export async function waitForSubmitFinish(): Promise<void> {
  while (isSubmitting()) {
    await sleep(500);
    console.log('Submitting...');
  }
}

export async function waitForSubmitButton(): Promise<void> {
  while (!getSubmitButton()) {
    await sleep(1000);
    console.log('Waiting for submit button...');
  }
}

export async function submitForm(): Promise<void> {
  const submitButton = getSubmitButton();
  if (!submitButton) {
    console.log('No submit button found');
    return;
  }
  submitButton.click();
}

export function getFormNumber(): number {
  const forms = document.querySelectorAll('form');
  return forms.length;
}

export async function clickAllButtonsWithConfirm(temp: Element): Promise<void> {
  const buttons = getButtons(temp);
  for (const button of buttons) {
    button.click();
    while (getFormNumber() === 1) {
      await sleep(500);
      console.log('Opening...');
    }
    submitForm();
    while (getFormNumber() === 2) {
      await sleep(500);
      console.log('Submitting...');
    }
  }
}

export function isClicking(button: Element): boolean {
  return button.querySelector('div > div')!.getAttribute('aria-hidden') === 'true';
}

export async function clickAllButtons(temp: Element): Promise<void> {
  const buttons = getButtons(temp);
  buttons.pop();
  for (const button of buttons) {
    button.click();
    while (!isClicking(button)) {
      await sleep(10);
      console.log('Waiting for clicking...');
    }
    while (isClicking(button)) {
      await sleep(500);
      console.log('Clicking...');
    }
  }
}

export async function smartClickAllButtons(temp: Element): Promise<void> {
  const buttons = getButtons(temp);
  const testText = buttons[0].textContent;
  if (testText?.startsWith('U')) {
    await clickAllButtons(temp);
  } else {
    await clickAllButtonsWithConfirm(temp);
  }
}
