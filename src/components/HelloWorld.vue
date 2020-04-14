<template>
  <div>
    <div>
      {{ computedMsg }}
    </div>
    <canvas ref="wrap" id="wrap"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from 'vue-property-decorator'
import * as THREE from 'three'
import { Scene, WebGLRenderer } from 'three'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  @Provide() obj: { [key: string]: string } = {}
  @Provide() name = 'demo'
  private scene: Scene = new THREE.Scene()
  private renderer: WebGLRenderer | null = null

  get computedMsg() {
    return 'hello' + this.name
  }
  mounted() {
    // this.initLine()
    this.createScene()
    // this.initOthographicCamera()
    this.init()
  }
  createScene() {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.wrap as HTMLCanvasElement,
    })
  }
  async init() {
    const width = window.innerWidth * 1
    const height = window.innerHeight * 1
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer?.setSize(width, height)
    // 创建模型
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    //生成着色器
    // const cube = new THREE.Mesh(geometry, material)
    const geometrySphere = new THREE.SphereGeometry(3, 8, 6) // 半径 经度切片 纬度切片
    const Sphere = new THREE.Mesh(geometrySphere, material)
    this.scene.add(Sphere)

    camera.position.z = 5
    this.renderer?.setPixelRatio(window.devicePixelRatio)

    // const animate = () => {
    //   requestAnimationFrame(animate)
    //   cube.rotation.x += 0.01
    //   cube.rotation.y += 0.01
    // }
    // animate()
    this.renderer?.render(this.scene, camera)
  }
  async initLine() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('wrap') as HTMLCanvasElement,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    // document.body.appendChild(renderer.domElement)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500) // 开启一个透视摄像机
    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0)
    const scene = new THREE.Scene()
    const material = new THREE.LineBasicMaterial({ color: 0xffffff })
    const geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
    geometry.vertices.push(new THREE.Vector3(0, 10, 0))
    geometry.vertices.push(new THREE.Vector3(10, 0, 0))
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0))

    const line = new THREE.Line(geometry, material)
    scene.add(line)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  }
  // 正交摄像机
  async initOthographicCamera() {
    this.renderer?.setSize(window.innerWidth, window.innerHeight)
    const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)
    camera.position.set(4, -3, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene.add(camera)
    this.createCube(1, 1, 1, { color: 0xffffff, wireframe: true })
    this.renderer?.render(this.scene, camera)
  }
  createCube(
    x: number,
    y: number,
    z: number,
    parameters?: THREE.MeshBasicMaterialParameters | undefined,
  ) {
    // 创建模型
    const geometry = new THREE.BoxGeometry(x, y, z)
    // 创建材质
    const material = new THREE.MeshBasicMaterial(parameters)
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }
  async runWait() {
    await this.delay(2000)
    console.log('2')
  }
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) {}
}
</script>
