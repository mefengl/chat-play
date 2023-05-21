export function getLocalLanguage() {
  const userLanguage = navigator.language;
  const languageNames = new Intl.DisplayNames([userLanguage], { type: 'language' });
  const readableLanguage = languageNames.of(userLanguage);
  return readableLanguage;
}

export function onUrlChange(callback: (newUrl: string) => void): number {
  let oldHref = document.location.href;
  return window.setInterval(() => {
    const newHref = document.location.href;
    if (oldHref !== newHref) callback(oldHref = newHref);
  }, 1000);
}
