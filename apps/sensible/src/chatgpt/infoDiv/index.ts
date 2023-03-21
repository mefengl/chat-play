function getInfoDiv() {
  return document.querySelector("#infoDiv")
}

function getInfoDivClone() {
  return document.querySelector("#infoDivClone")
}

function initInfoDivClone() {
  let infoDiv = getInfoDiv();
  if (!infoDiv) {
   infoDiv = document.querySelector("form > div > div");
    infoDiv.id = "infoDiv";
  }
  let infoDivClone = getInfoDivClone();
  if (!infoDivClone) {
    infoDivClone = infoDiv.cloneNode(true)
    infoDivClone.id = "infoDivClone"
    infoDiv.parentNode?.insertBefore(infoDivClone, infoDiv)
  }
}

export { getInfoDiv, getInfoDivClone, initInfoDivClone}
