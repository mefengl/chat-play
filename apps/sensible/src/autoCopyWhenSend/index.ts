function onSend() {
  navigator.clipboard.writeText(chatgpt.getChatInput());
}

function autoCopyWhenSend() {
  const textarea = chatgpt.getTextarea();
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      onSend();
    }
  });
  const sendButton = chatgpt.getSendButton();
  sendButton.addEventListener('click', onSend);
}

export default autoCopyWhenSend;
