/**
 * The effection like Thanos snapping finger
 * @author imcuttle
 */

import html2canvas from 'html2canvas'
import parseUnit from 'parse-unit'

import { getOffsetBy, prefixEventListenerPromise } from './utils'

const requestAnimationFramePromise = () => {
  return new Promise(resolve => requestAnimationFrame(() => {
    console.log('requestAnimationFramePromise')
    resolve()
  }))
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(() => {
    console.log('setTimeout')
    resolve()
  }, ms))
}

// 粒子化
function particlify(canvas, { frameCount = 10 } = {}) {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  // 获取 canvas 的像素数据
  const originalFrame = ctx.getImageData(0, 0, width, height)

  const frames = new Array(frameCount).fill({}).map(() => ctx.createImageData(width, height))
  // 将原始的像素数据，随机分散到多个canvas上面，粒子化
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // 随机获取 像素对象
      const frameIndex = Math.floor(Math.random() * frameCount)
      // 当前的像素位置：通过 x、y 计算出当前遍历到哪个像素点，实际就是从左到右，一行一行的遍历
      const pixelIndex = 4 * (y * width + x)
      // 一个像素 rgba，所以需要设置 4 个值
      for (let z = 0; z < 4; z++) {
        frames[frameIndex].data[pixelIndex + z] = originalFrame.data[pixelIndex + z]
      }
    }
  }
  return frames
}

export default async (
  elem,
  {
    frameCount = 20,
    debug = false,
    duration = '2s',
    getOffset = getOffsetBy,
    relativeElem,
    canvasClassName = 'snap-fade-away-canvas'
  } = {}
) => {
  if (typeof document === 'undefined') {
    console.error('Please use snap-fade-away in browser.')
    return
  }
  if (!relativeElem) {
    relativeElem = document.documentElement
  }

  elem.style.visibility = 'visible'
  elem.style.opacity = 1
  elem.style.transition = `opacity ${duration} ease 0s`

  let canvas = await html2canvas(elem)
  let tasks = []
  const { width, height } = canvas
  const frames = particlify(canvas)

  elem.style.opacity = 0
  tasks.push(
    prefixEventListenerPromise(elem, 'transitionEnd').then(() => {
      elem.style.opacity = ''
      !debug && (elem.style.visibility = 'hidden')
      elem.style.transition = ''
    })
  )

  const { left, top } = getOffset(elem, relativeElem)
  // 遍历像素对象，将像素对象填充到画布上面
  const canvasNodes = frames.map((item, i) => {
    const cloneNode = canvas.cloneNode(true)
    cloneNode.getContext('2d').putImageData(item, 0, 0)
    Object.assign(cloneNode.style, {
      transition: `transform ${duration} ease-out ${i / frameCount}s, opacity ${duration} ease-out`,
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      userSelect: 'none',
      pointerEvents: 'none',
      opacity: 1,
      transform: 'rotate(0deg) translate(0px)'
    })
    relativeElem.appendChild(cloneNode)
    cloneNode.className = canvasClassName
    return cloneNode
  })

  // https://birtles.github.io/cssconf2019/index.zh.html#/css-transitions-panel-attempt-three
  getComputedStyle(elem).transform;

  canvasNodes.forEach((item, i) => {
    let base = i % 2 === 0 ? 1 : -1
    let tx = base * Math.random() * width * 0.02
    item.style.transform = `rotate(${-base * i * Math.random()}deg) translate(${i === 0 ? 0 : tx}px)`
    !debug && (item.style.opacity = 0)

    tasks.push(prefixEventListenerPromise(item, 'transitionEnd'))
  })

  return Promise.all(tasks).then(() => {
    !debug &&
      canvasNodes.forEach(node => {
        node.remove()
      })
  })
}
