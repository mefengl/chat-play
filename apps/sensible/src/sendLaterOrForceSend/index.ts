import { getInfoDiv, getInfoDivClone } from "../chatgpt/infoDiv";
import onSend from "../onSend";
import chatgpt from "../chatgpt";

export default function sendLaterOrForceSend() {
  let waitForSecondEnter = false;
  onSend(async () => {
    const stopGeneratingButton = chatgpt.getStopGeneratingButton();
    if (!stopGeneratingButton) return;
    if (waitForSecondEnter) {
      waitForSecondEnter = false;
      stopGeneratingButton.click();
      chatgpt.getSendButton().click();

      // check if error
      setTimeout(() => {
        const infoDiv = getInfoDiv();
        console.log(infoDiv.innerHTML);
        if (infoDiv.innerHTML.toLowerCase().includes("error")) {
          const regenerateButton = chatgpt.getRegenerateButton();
          if (regenerateButton) regenerateButton.click();
        }
      }, 3000);
      return;
    }

    const infoDivClone = getInfoDivClone();
    infoDivClone.innerHTML = "Press enter again in 3 seconds to send";
    waitForSecondEnter = true;

    // clear the waiting for second enter after 3 seconds
    setTimeout(() => {
      waitForSecondEnter = false;
      infoDivClone.innerHTML = "";
    }
      , 3000);
  })
}
