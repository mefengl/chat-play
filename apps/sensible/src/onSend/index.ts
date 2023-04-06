import { chatgpt } from "chatkit";

function onSend(callback: () => void) {
  const textarea = chatgpt.getTextarea();
  if (!textarea) return;
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      callback();
    }
  });
  const sendButton = chatgpt.getSubmitButton();
  if (!sendButton) return;
  sendButton.addEventListener('click', callback);
}

export default onSend;
