import { chatgpt } from "chatkit";
import { getInfoDiv, getInfoDivClone } from "../infoDiv";
import onSend from "../onSend";

export default function sendLaterOrForceSend() {
  let waitForSecondEnter = false;
  onSend(async () => {
    const stopGeneratingButton = chatgpt.getStopGeneratingButton();
    if (!stopGeneratingButton) return;
    if (waitForSecondEnter) {
      waitForSecondEnter = false;
      stopGeneratingButton.click();
      chatgpt.getSubmitButton()?.click();

      // check if error
      setTimeout(() => {
        const infoDiv = getInfoDiv();
        if (!infoDiv) return;
        console.log(infoDiv.innerHTML);
        if (infoDiv.innerHTML.toLowerCase().includes("error")) {
          const regenerateButton = chatgpt.getRegenerateButton();
          if (regenerateButton) regenerateButton.click();
        }
      }, 3000);
      return;
    }

    const infoDivClone = getInfoDivClone();
    if (!infoDivClone) return;
    infoDivClone.innerHTML = "Press enter again in 3 seconds to send";
    waitForSecondEnter = true;

    // clear the waiting for second enter after 3 seconds
    setTimeout(() => {
      waitForSecondEnter = false;
      infoDivClone.innerHTML = "";
    }, 3000);
  })
}
