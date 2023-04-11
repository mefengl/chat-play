export function getActionBar(): ShadowRoot | null {
  return document.querySelector("cib-serp")?.shadowRoot?.querySelector("cib-action-bar")?.shadowRoot || null;
}

export function getSubmitButton(): HTMLElement | null {
  const actionBar = getActionBar();
  if (!actionBar) { return null; }
  return actionBar.querySelector('button[aria-label="Submit"]');
}

export function getTextarea(): HTMLTextAreaElement | null {
  const actionBar = getActionBar();
  if (!actionBar) { return null; }
  return actionBar.querySelector('textarea');
}

export function getStopGeneratingButton(): HTMLButtonElement | null {
  const actionBar = getActionBar();
  if (!actionBar) { return null; }
  const stopGeneratingButton = actionBar.querySelector('cib-typing-indicator')?.shadowRoot?.querySelector('button[aria-label="Stop Responding"]');
  if (!stopGeneratingButton) { return null; }
  if ((stopGeneratingButton as HTMLButtonElement).disabled) { return null; }
  return stopGeneratingButton as HTMLButtonElement;
}

export function getNewChatButton(): HTMLElement | null {
  const actionBar = getActionBar();
  if (!actionBar) { return null; }
  return actionBar.querySelector('button[aria-label="New topic"]');
}

export function getConversation(): ShadowRoot | null {
  return document.querySelector("cib-serp")?.shadowRoot?.querySelector("cib-conversation")?.shadowRoot || null;
}

export function getChatTurns(): ShadowRoot[] | null {
  const conversation = getConversation();
  if (!conversation) { return null; }
  return Array.from(conversation.querySelectorAll('cib-chat-turn')).map(t => t.shadowRoot) as ShadowRoot[];
}

export function getSuggestionBar(): ShadowRoot | null {
  const conversation = getConversation();
  if (!conversation) { return null; }
  return conversation.querySelector('cib-suggestion-bar')?.shadowRoot || null;
}

export function getSuggestionBarButtons(): HTMLElement[] {
  const suggestionBar = getSuggestionBar();
  if (!suggestionBar) { return []; }
  const suggestionItems = Array.from(suggestionBar.querySelectorAll('cib-suggestion-item'));
  return suggestionItems.map(i => i.shadowRoot?.querySelector('button') as HTMLElement);
}

export function getRegenerateButton(): HTMLElement | null {
  const suggestionBarButtons = getSuggestionBarButtons();
  if (!suggestionBarButtons.length) { return null; }
  return suggestionBarButtons[0];
}

export function getLastChatTurn(): ShadowRoot | null {
  const chatTurns = getChatTurns();
  if (!chatTurns) { return null; }
  return chatTurns[chatTurns.length - 1];
}

export function getLastResponse(): ShadowRoot | null {
  const lastChatTurn = getLastChatTurn();
  if (!lastChatTurn) { return null; }
  return lastChatTurn.querySelectorAll('cib-message-group')[1]?.shadowRoot || null;
}

export function getLastResponseText(): string | null {
  const lastResponse = getLastResponse();
  if (!lastResponse) { return null; }
  const message = Array.from(lastResponse.querySelectorAll('cib-message'))
    .map(m => m.shadowRoot)
    .find(m => m?.querySelector('cib-shared'));
  return message?.textContent?.trim() || null;
}

export function send(text: string): void {
  const textarea = getTextarea();
  if (!textarea) { return; }
  textarea.value = text;
  textarea.dispatchEvent(new Event('input'));
  const submitButton = getSubmitButton();
  if (!submitButton) { return; }
  submitButton.click();
}

export function onSend(callback: () => void): void {
  const textarea = getTextarea();
  if (!textarea) return;
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      callback();
    }
  });
  const sendButton = getSubmitButton();
  if (!sendButton) return;
  sendButton.addEventListener('mousedown', callback);
}

const bingchat = {
  getActionBar,
  getSubmitButton,
  getTextarea,
  getStopGeneratingButton,
  getNewChatButton,
  getConversation,
  getChatTurns,
  getLastChatTurn,
  getLastResponse,
  getLastResponseText,
  send,
  onSend,
};

export default bingchat;
