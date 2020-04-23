import * as THREE from 'three'
import roboto from './assets/roboto'

interface NumGeometryCache {
  [key: string]: THREE.BufferGeometry
}
// 加载字体
const font = new THREE.FontLoader().parse(roboto)

const cache: NumGeometryCache = {}

// 设置面板模型
export function generateBoardGeometry(boardSize: number) {
  return new THREE.BoxBufferGeometry(boardSize, 0.2, boardSize)
}
// 设置边界
export function generateEdgeGeometry(boardSize: number, marginSize: number) {
  return new THREE.BoxBufferGeometry(boardSize + 4 * marginSize, 2 * marginSize, 2 * marginSize)
}

export function generateNumGeometry(num: number) {
  if (!cache[num]) {
    cache[num] = new THREE.TextBufferGeometry(num.toString(), {
      font,
      size: 0.4,
      height: 0.4,
    })
      .center()
      .rotateX(Math.PI / 2)
      .rotateY(Math.PI)
      .rotateZ(Math.PI)
  }
  return cache[num]
}
export const tileGeometry = new THREE.BoxBufferGeometry(1, 0.2, 1)
