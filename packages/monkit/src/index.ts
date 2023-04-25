export function getLocalLanguage() {
  const userLanguage = navigator.language;
  const languageNames = new Intl.DisplayNames([userLanguage], { type: 'language' });
  const readableLanguage = languageNames.of(userLanguage);
  return readableLanguage;
}
