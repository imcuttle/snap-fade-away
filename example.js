/**
 * @file example
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/5/7
 *
 */
import 'babel-polyfill'
import fade from './index'

window['reset-btn'].onclick = () => {
  window.root.style.visibility = 'visible'
}

let isRunning = false
window.btn.onclick = () => {
  console.log('isRunning', isRunning)
  if (isRunning) {
    return
  }

  isRunning = true
  fade(window.root, {
    debug: false,
    relativeElem: document.body
  }).then(() => {
    isRunning = false
  })
}
