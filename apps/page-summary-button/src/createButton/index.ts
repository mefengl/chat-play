function createButton(callback: () => void) {
  // if origin end with 'chat.openai.com', then return
  if (window.location.href.includes("chat.openai")) { return; }

  // if title contains Chinese, then make button less visible
  const hideRight = document.title.match(/[\u4e00-\u9fa5]/) ? "-130px" : "-120px";

  // create the button
  const button = document.createElement("button");
  button.innerHTML = "TL;DR";
  button.style.position = "fixed";
  button.style.width = "140px";
  button.style.top = "180px";
  button.style.right = hideRight;
  button.style.zIndex = "999999";
  button.style.backgroundColor = "#F8BBC6";
  button.style.color = "#fff";
  button.style.opacity = "0.8";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.padding = "10px 16px";
  button.style.fontSize = "18px";
  button.style.cursor = "pointer";
  button.style.transition = "right 0.3s";
  document.body.appendChild(button);

  // hover to show, and hide when not hover
  button.addEventListener("mouseenter", () => {
    button.style.right = "-10px";
  });
  button.addEventListener("mouseleave", () => {
    button.style.right = hideRight;
  });

  // hide button if full screen
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  });

  // set button click action
  button.addEventListener("click", callback);
}

export default createButton;
