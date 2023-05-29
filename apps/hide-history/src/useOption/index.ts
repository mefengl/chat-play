/** 
MIT License

Copyright (c) 2022 Anthony Fu <https://github.com/antfu>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 Original Source: https://github.com/antfu/userscript-clean-twitter/commit/e0e745d238f64618a36221ea5c56c5a72b615dba
 Original Author: Anthony Fu <https://github.com/antfu>
 There may be some adjustments made due to the actual situation.
 LICENSE could be also found in LICENSES folder under this script source code folder.
*/

export function useOption(key: string, title: string, defaultValue: boolean) {
  if (typeof GM_getValue === 'undefined') {
    return {
      value: defaultValue,
    }
  }

  let value = GM_getValue(key, defaultValue)
  const ref = {
    get value() {
      return value
    },
    set value(v) {
      value = v
      GM_setValue(key, v)
      location.reload()
    },
  }

  GM_registerMenuCommand(`${title}: ${value ? '✅' : '❌'}`, () => {
    ref.value = !value
  })

  return ref
}
