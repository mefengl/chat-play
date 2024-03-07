export function segmentText(text: string, baseLength = 3600) {
  const paras = []
  const minLen = baseLength * 0.9
  const maxLen = baseLength * 1.1
  const tokenRatio = 0.6

  const hasAsianChars = (str: string) => /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Hangul}]/gu.test(str)
  const maxParaLen = hasAsianChars(text) ? Math.floor(maxLen * tokenRatio) : maxLen

  if (hasAsianChars(text)) {
    for (let i = 0; i < text.length; i += maxParaLen)
      paras.push(text.substring(i, i + maxParaLen))
  }
  else {
    let para = ''
    for (const sentence of text.split(/(?<=[.!?])(\s+)/)) {
      if (para.length + sentence.length + 1 <= maxLen) {
        para += (para ? ' ' : '') + sentence
      }
      else {
        if (para.length >= minLen)
          paras.push(para)
        para = sentence
      }
    }
    if (para)
      paras.push(para)
  }
  return paras
}
