<template>
  <div>
    <Tile
      v-for="tile in manager.getTiles()"
      :key="tile.id"
      :x="tile.x"
      :y="tile.y"
      :value="tile.value"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import Tile from './Tile.vue'
import BoardManager from '../manager'
import Scene from './Scene.vue'
import { generateBoardGeometry, generateEdgeGeometry } from '../geomertries'
import { boardMaterial } from '../material'
import * as THREE from 'three'

enum Edge {
  BOTTOM,
  RIGHT,
  TOP,
  LEFT,
}

@Component<Board>({
  components: {
    Tile,
  },
  mounted() {
    this.generateBoard()
    this.startGame()
  },
  destroyed() {
    this.$parent.scene.remove(this.object3D)
  },
})
export default class Board extends Vue {
  @Prop({ type: Number, default: 4 })
  private size!: number

  private manager = new BoardManager(this.size)

  object3D!: THREE.Mesh

  $parent!: Scene

  private generateBoard() {
    this.$nextTick(() => {
      this.object3D = new THREE.Mesh(
        generateBoardGeometry(this.manager.getBoardSize()),
        boardMaterial,
      )
      this.$parent.scene.add(this.object3D)
      this.generateEdges()
    })
  }
  private generateEdges() {
    const boardSize = this.manager.getBoardSize()
    const marginSize = this.manager.getMarginSize()
    const edgeGeometry = generateEdgeGeometry(boardSize, marginSize)
    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(edgeGeometry, boardMaterial)
      mesh.rotation.y = (Math.PI / 2) * i
      switch (i) {
        case Edge.BOTTOM: {
          mesh.position.z = -(boardSize / 2 + marginSize)
          break
        }
        case Edge.RIGHT: {
          mesh.position.x = boardSize / 2 + marginSize
          break
        }
        case Edge.TOP: {
          mesh.position.z = boardSize / 2 + marginSize
          break
        }
        case Edge.LEFT: {
          mesh.position.x = -(boardSize / 2 + marginSize)
          break
        }
        default:
      }
      this.$parent.raycaster.on('pointerdown', mesh, () => {
        this.manager.updateTiles(i)
      })
      this.object3D.add(mesh)
    }
  }

  private startGame() {
    this.manager.resetTiles()
  }
  private endGame() {
    this.manager.resetTiles()
  }

  getBoardSize() {
    return this.manager.getBoardSize()
  }
  getMarginSize() {
    return this.manager.getMarginSize()
  }
}
</script>

<style></style>
