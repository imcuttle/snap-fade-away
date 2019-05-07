/**
 * @file utils
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/5/7
 *
 */

export function getOffset(el) {
  el = el.getBoundingClientRect()
  return {
    width: el.width,
    height: el.height,
    left: el.left + (global.scrollX || document.documentElement.scrollLeft),
    top: el.top + (global.scrollY || document.documentElement.scrollTop)
  }
}

export function getOffsetBy(elem, byElem = document.documentElement) {
  let eleRect = getOffset(elem)
  let byEleRect = getOffset(byElem)

  return {
    ...eleRect,
    left: eleRect.left - byEleRect.left,
    top: eleRect.top - byEleRect.top
  }
}

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Prefix EventListener
 */
export const prefixEventListener = (element, event, cb, addListener = true) => {
  const listener = addListener ? 'addEventListener' : 'removeEventListener'
  return ['webkit', 'moz', 'MS', 'o', '']
    .map(prefix => (prefix ? prefix + capitalize(event) : event))
    .forEach(event => element[listener](event, cb))
}

export const prefixEventListenerPromise = (element, event, addListener) => {
  return new Promise(resolve => {
    prefixEventListener(
      element,
      event,
      arg => {
        resolve(arg)
      },
      addListener
    )
  })
}
