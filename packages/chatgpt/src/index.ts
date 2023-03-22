type Position = 'top' | 'bottom' | 'left' | 'right';

class ChatGPT {
  private clearChatsCnt?: number;
  private isDisplaying?: boolean;
  private hideTimer?: number;
  private status: string;
  private prevStatus: string;
  private events: Record<string, Function[]>;

  constructor() {
    this.clearChatsCnt = 0;
    this.isDisplaying = false;
    this.status = 'idle';
    this.prevStatus = 'idle';
    this.events = {};
  }

  clearChats(): void {
    const clearLabels = ['Clear conversations', 'Confirm clear conversations'];
    if (!this.clearChatsCnt) this.clearChatsCnt = 0;
    if (this.clearChatsCnt >= clearLabels.length) return; // exit if already confirmed
    for (const navLink of Array.from(document.querySelectorAll('nav > a'))) {
      if (navLink.textContent?.includes(clearLabels[this.clearChatsCnt])) {
        (navLink as HTMLElement).click(); this.clearChatsCnt++;
        setTimeout(() => this.clearChats(), 500); return; // repeat to confirm
      }
    }
  }

  getChatInput(): string {
    return (document.querySelector('form textarea') as HTMLTextAreaElement).value;
  }

  getNewChatButton(): HTMLElement | undefined {
    for (const navLink of Array.from(document.querySelectorAll('nav > a'))) {
      if (navLink.textContent?.includes('New chat')) {
        return navLink as HTMLElement;
      }
    }
  }

  getRegenerateButton(): HTMLElement | undefined {
    const form = document.querySelector('form');
    const buttons = form!.querySelectorAll('button');
    const result = Array.from(buttons).find((button) => button.textContent?.trim().toLowerCase().includes('regenerate'));
    return result;
  }

  getSendButton(): HTMLElement | null {
    return document.querySelector('form button[class*="bottom"]');
  }

  getStopGeneratingButton(): HTMLElement | undefined {
    const form = document.querySelector('form');
    const buttons = form!.querySelectorAll('button');
    return Array.from(buttons).find((button) => button.textContent?.trim().toLowerCase().includes('stop generating'));
  }

  getTextarea(): HTMLTextAreaElement | undefined {
    const form = document.querySelector('form');
    const textareas = form!.querySelectorAll('textarea');
    const result = textareas[0] as HTMLTextAreaElement;
    return result;
  }

  getLastResponseElement(): HTMLElement | undefined {
    const responseElements = document.querySelectorAll('.group.w-full');
    return responseElements[responseElements.length - 1] as HTMLElement;
  }

  getLastResponse(): string | null {
    const lastResponseElement = this.getLastResponseElement();
    if (!lastResponseElement) return null;
    const lastResponse = lastResponseElement.textContent;
    return lastResponse;
  }

  send(msg: string): void {
    const textarea = this.getTextarea();
    textarea!.value = msg;
    const sendButton = this.getSendButton();
    sendButton && sendButton.click();
  }

  stop(): void {
    const stopGeneratingButton = this.getStopGeneratingButton();
    stopGeneratingButton && stopGeneratingButton.click();
  }

  regenerate(): void {
    const regenerateButton = this.getRegenerateButton();
    regenerateButton && regenerateButton.click();
  }

  new(): void {
    const newChatButton = this.getNewChatButton();
    newChatButton && newChatButton.click();
  }

  sendInNewChat(msg: string): void {
    this.new();
    setTimeout(() => {
      this.send(msg);
    }, 500);
  }


  notify(msg: string, position: Position = 'top'): void {
    const vOffset = 13;
    const hOffset = 27;
    const notificationDuration = 1.75;
    const fadeDuration = 0.6;

    let notificationDiv = document.querySelector('#notification-alert') as HTMLElement;
    if (!notificationDiv) {
      notificationDiv = document.createElement('div');
      notificationDiv.id = 'notification-alert';
      notificationDiv.style.cssText = (
        'background-color: black; padding: 10px; border-radius: 8px; '
        + 'opacity: 0; position: fixed; z-index: 9999; font-size: 1.8rem; color: white');
      document.body.appendChild(notificationDiv);
    }

    notificationDiv.style.top = !(/low|bottom/i.test(position)) ? `${vOffset}px` : '';
    notificationDiv.style.bottom = /low|bottom/i.test(position) ? `${vOffset}px` : '';
    notificationDiv.style.right = !(/left/i.test(position)) ? `${hOffset}px` : '';
    notificationDiv.style.left = /left/i.test(position) ? `${hOffset}px` : '';

    if (this.isDisplaying) clearTimeout(this.hideTimer);
    notificationDiv.innerHTML = msg;
    notificationDiv.style.transition = 'none';
    notificationDiv.style.opacity = '1';
    this.isDisplaying = true;

    const hideDelay = (
      fadeDuration > notificationDuration ? 0
        : notificationDuration - fadeDuration);
    this.hideTimer = setTimeout(() => {
      notificationDiv.style.transition = `opacity ${fadeDuration}s`;
      notificationDiv.style.opacity = '0';
      this.isDisplaying = false;
    }, hideDelay * 1000);
  }

  startNewChat() {
    for (const link of Array.from(document.getElementsByTagName('a'))) {
      if (link.textContent?.includes('New chat')) {
        link.click();
        break;
      }
    }
  }

  updateStatus(): void {
    const stopGeneratingButton = this.getStopGeneratingButton();

    if (stopGeneratingButton) {
      this.status = 'generating';
    } else {
      this.status = 'idle';
    }
    if (this.status !== this.prevStatus) {
      this.toggleStatus();
    }
  }

  toggleStatus(): void {
    this.prevStatus = this.status;
    if (this.status === 'idle') {
      this.emit('onIdle');
    } else if (this.status === 'generating') {
      this.emit('onGenerating');
    }
  }

  on(eventName: string, callback: Function): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  once(eventName: string, callback: Function): void {
    const oneTimeCallback = (...args: any[]) => {
      callback.apply(null, args);
      this.removeListener(eventName, oneTimeCallback);
    };
    this.on(eventName, oneTimeCallback);
  }

  removeListener(eventName: string, callback: Function): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
    }
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback.apply(null, args);
      });
    }
  }
}

export default ChatGPT;
