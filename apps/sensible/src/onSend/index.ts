import ChatGPT from "chatgpt"

const chatgpt = new ChatGPT();

function onSend(callback: () => void) {
  const textarea = chatgpt.getTextarea();
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      callback();
    }
  });
  const sendButton = chatgpt.getSendButton();
  sendButton.addEventListener('click', callback);
}

export default onSend;
