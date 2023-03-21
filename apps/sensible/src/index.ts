async function initialize() {
  while (!window.chatgpt) { await new Promise((r) => setTimeout(r, 1000)); }
}

function onSend() {
  navigator.clipboard.writeText(chatgpt.getChatInput());
}

async function main() {
  await initialize();
  const textarea = chatgpt.getTextarea();
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      onSend();
    }
  });
  const sendButton = chatgpt.getSendButton();
  sendButton.addEventListener('click', onSend);
}

(function () {
  main();
}());

/*
 *  The code in this function was adapted from the chatgptjs/chatgpt.js library,
 *  authored by Adam Lui and 冯不游
 *  (https://chatgptjs.org) and licensed under the MIT License.
 */
(function () {
  const chatgpt = {

    clearChats() {
      const clearLabels = ['Clear conversations', 'Confirm clear conversations'];
      if (!this.clearChats.cnt) this.clearChats.cnt = 0;
      if (this.clearChats.cnt >= clearLabels.length) return; // exit if already confirmed
      for (const navLink of document.querySelectorAll('nav > a')) {
        if (navLink.text.includes(clearLabels[this.clearChats.cnt])) {
          navLink.click(); this.clearChats.cnt++;
          setTimeout(this.clearChats.bind(this), 500); return; // repeat to confirm
        }
      }
    },

    getChatInput() {
      return document.querySelector('form textarea').value;
    },

    getNewChatButton() {
      for (const navLink of document.querySelectorAll('nav > a')) {
        if (navLink.text.includes('New chat')) {
          return navLink;
        }
      }
    },

    getRegenerateButton() {
      const form = document.querySelector('form');
      const buttons = form.querySelectorAll('button');
      const result = Array.from(buttons).find((button) => button.textContent.trim().toLowerCase().includes('regenerate'));
      return result;
    },

    getSendButton() {
      return document.querySelector('form button[class*="bottom"]');
    },

    getStopGeneratingButton() {
      const form = document.querySelector('form');
      const buttons = form.querySelectorAll('button');
      return Array.from(buttons).find((button) => button.textContent.trim().toLowerCase().includes('stop generating'));
    },

    getTextarea() {
      const form = document.querySelector('form');
      const textareas = form.querySelectorAll('textarea');
      const result = textareas[0];
      return result;
    },

    getLastResponseElement() {
      const responseElements = document.querySelectorAll('.group.w-full');
      return responseElements[responseElements.length - 1];
    },

    getLastResponse() {
      const lastResponseElement = this.getLastResponseElement();
      if (!lastResponseElement) return;
      const lastResponse = lastResponseElement.textContent;
      return lastResponse;
    },

    send(msg) {
      const textarea = this.getTextarea();
      textarea.value = msg;
      const sendButton = this.getSendButton();
      sendButton && sendButton.click();
    },

    stop() {
      const stopGeneratingButton = this.getStopGeneratingButton();
      stopGeneratingButton && stopGeneratingButton.click();
    },

    regenerate() {
      const regenerateButton = this.getRegenerateButton();
      regenerateButton && regenerateButton.click();
    },

    new() {
      const newChatButton = this.getNewChatButton();
      newChatButton && newChatButton.click();
    },

    sendInNewChat(msg) {
      this.new();
      setTimeout(() => {
        this.send(msg);
      }, 500);
    },

    notify(msg, position = '') {
      const vOffset = 13; const
        hOffset = 27; // px offset from viewport border
      const notificationDuration = 1.75; // sec duration to maintain notification visibility
      const fadeDuration = 0.6; // sec duration of fade-out

      // Find or make div
      let notificationDiv = document.querySelector('#notification-alert');
      if (!notificationDiv) { // if missing
        notificationDiv = document.createElement('div'); // make div
        notificationDiv.id = 'notification-alert';
        notificationDiv.style.cssText = ( // stylize it
          '/* Box style */   background-color: black ; padding: 10px ; border-radius: 8px ; '
          + '/* Visibility */  opacity: 0 ; position: fixed ; z-index: 9999 ; font-size: 1.8rem ; color: white');
        document.body.appendChild(notificationDiv); // insert into DOM
      }

      // Position notification (defaults to top-right)
      notificationDiv.style.top = !/low|bottom/i.test(position) ? `${vOffset}px` : '';
      notificationDiv.style.bottom = /low|bottom/i.test(position) ? `${vOffset}px` : '';
      notificationDiv.style.right = !/left/i.test(position) ? `${hOffset}px` : '';
      notificationDiv.style.left = /left/i.test(position) ? `${hOffset}px` : '';

      // Show notification
      if (this.notify.isDisplaying) clearTimeout(this.notify.hideTimer); // clear previous hide
      notificationDiv.innerHTML = msg; // insert msg
      notificationDiv.style.transition = 'none'; // remove fade effect
      notificationDiv.style.opacity = 1; // show msg
      this.notify.isDisplaying = true;

      // Hide notification
      const hideDelay = ( // set delay before fading
        fadeDuration > notificationDuration ? 0 // don't delay if fade exceeds notification duration
          : notificationDuration - fadeDuration); // otherwise delay for difference
      this.notify.hideTimer = setTimeout(function hideNotif() { // maintain notification visibility, then fade out
        notificationDiv.style.transition = `opacity ${fadeDuration}s`; // add fade effect
        notificationDiv.style.opacity = 0; // hide notification...
        this.notify.isDisplaying = false;
      }, hideDelay * 1000); // ...after pre-set duration
    },

    startNewChat() {
      for (const link of document.getElementsByTagName('a')) {
        if (link.text.includes('New chat')) {
          link.click(); break;
        }
      }
    },

    isIdle: true,
    isGenerating: false,
    status: 'idle',
    prevStatus: 'idle',

    updateStatus() {
      const stopGeneratingButton = this.getStopGeneratingButton();

      if (stopGeneratingButton) {
        this.isIdle = false;
        this.isGenerating = true;
        this.status = 'generating';
      } else if (!stopGeneratingButton) {
        this.isIdle = true;
        this.isGenerating = false;
        this.status = 'idle';
      }
      if (this.status !== this.prevStatus) {
        this.toggleStatus();
      }
    },

    toggleStatus() {
      this.prevStatus = this.status;
      if (this.status === 'idle') {
        this.eventEmitter.emit('onIdle');
      } else if (this.status === 'generating') {
        this.eventEmitter.emit('onGenerating');
      }
    },

    eventEmitter: {
      events: {},

      on(eventName, callback) {
        if (!this.events[eventName]) {
          this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
      },

      once(eventName, callback) {
        const self = this;
        function oneTimeCallback() {
          callback.apply(null, arguments);
          self.removeListener(eventName, oneTimeCallback);
        }
        this.on(eventName, oneTimeCallback);
      },

      removeListener(eventName, callback) {
        if (this.events[eventName]) {
          this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
        }
      },

      emit(eventName) {
        if (this.events[eventName]) {
          const args = Array.prototype.slice.call(arguments, 1);
          this.events[eventName].forEach((callback) => {
            callback.apply(null, args);
          });
        }
      },
    },
  };

  // Create alias functions
  const aliases = [ // synonyms within function names
    ['chat', 'conversation', 'convo'],
    ['send', 'submit'],
  ];
  const reAliases = new RegExp(aliases.flat().join('|'), 'gi');
  for (const prop in chatgpt) {
    if (typeof chatgpt[prop] === 'function') {
      for (const match of prop.matchAll(reAliases)) {
        var originalWord = match[0].toLowerCase();
        const aliasValues = [].concat(...aliases // flatten into single array w/ match's aliases
          .filter((arr) => arr.includes(originalWord)) // filter in relevant alias sub-arrays
          .map((arr) => arr.filter((word) => word !== originalWord))); // filter out match word
        const matchCase = /^[A-Z][a-z]+$/.test(match[0]) ? 'title'
          : /^[a-z]+$/.test(match[0]) ? 'lower'
            : /^[A-Z]+$/.test(match[0]) ? 'upper' : 'mixed';
        for (let alias of aliasValues) { // make alias functions
          alias = ( // preserve camel case for new name
            matchCase === 'title' ? alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase()
              : matchCase === 'upper' ? alias.toUpperCase()
                : matchCase === 'lower' ? alias.toLowerCase() : alias);
          const aliasProp = prop.replace(match[0], alias); // name new function
          chatgpt[aliasProp] = chatgpt[prop]; // reference original function
        }
      }
    }
  }

  try { window.chatgpt = chatgpt; } catch (error) { /* for Greasemonkey */ }
  try { module.exports = chatgpt; } catch (error) { /* for CommonJS */ }

  // Use the added functions to get the elements
  const sendButton = chatgpt.getSendButton();
  const textarea = chatgpt.getTextarea();
  const regenerateButton = chatgpt.getRegenerateButton();
  const stopGeneratingButton = chatgpt.getStopGeneratingButton();
  const newChatButton = chatgpt.getNewChatButton();

  // Check the status
  setInterval(() => {
    chatgpt.updateStatus();
  }, 1000);

  sendButton && sendButton.addEventListener('click', () => {
    chatgpt.updateStatus();
  });

  // Listener examples
  chatgpt.eventEmitter.on('onIdle', () => {
    console.log('Chat is idle');
  });
  chatgpt.eventEmitter.on('onGenerating', () => {
    console.log('Chat is generating');
  });

  // Pre-assign IDs to the elements
  sendButton && (sendButton.id = 'chatgpt-submit-button');
  textarea && (textarea.id = 'chatgpt-textarea');
  regenerateButton && (regenerateButton.id = 'chatgpt-regenerate-button');
  stopGeneratingButton && (stopGeneratingButton.id = 'chatgpt-stop-generating-button');
  newChatButton && (newChatButton.id = 'chatgpt-new-chat-button');
}());
