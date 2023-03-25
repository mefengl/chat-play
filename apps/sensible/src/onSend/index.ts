import chatkit from "chatkit";

function onSend(callback: () => void) {
  const textarea = chatkit.getTextarea();
  if (!textarea) return;
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      callback();
    }
  });
  const sendButton = chatkit.getSubmitButton();
  if (!sendButton) return;
  sendButton.addEventListener('click', callback);
}

export default onSend;
