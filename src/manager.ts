import Grid from './grid'

enum Direction {
  DOWN,
  UP,
  LEFT,
  RIGHT,
}
export default class BoardManager {
  private size: number
  private grid: Grid
  constructor(size: number) {
    this.grid = new Grid(size)
    this.size = size
  }

  // 生成一个数字
  private generateTile() {
    // 随机在棋盘上找一个位置
    const empty = this.grid.getEmpty()
    const index = Math.round(Math.random() * empty.length)
    const { x, y } = empty[index]

    const id = Math.random()
      .toString(36)
      .substr(2, 9)

    // 随机添加一个 2 或者4
    this.grid.addTile({
      value: Math.random() <= 0.3 ? 4 : 2,
      changed: false,
      merged: false,
      id,
      x,
      y,
    })
  }

  // 移动方法
  private moveTiles(direction: Direction) {
    switch (direction) {
      case Direction.UP:
      case Direction.DOWN: {
        const up = direction === Direction.UP
        this.grid.eachColumn(column => {
          column
            .sort((tileA, tileB) => (up ? tileB.y - tileA.y : tileA.y - tileB.y))
            .forEach((tile, index, tiles) => {
              if (tile.y !== (up ? this.size - 1 : 0)) {
                if (index === 0) {
                  this.grid.setTileY(tile, up ? this.size - 1 : 0)
                } else {
                  const priviousTile = tiles[index - 1]
                  if (priviousTile.value === tile.value) {
                    this.grid.merge(priviousTile, tile)
                  } else {
                    this.grid.setTileY(tile, up ? priviousTile.y - 1 : priviousTile.y + 1)
                  }
                }
              }
            })
        })
        break
      }
      case Direction.RIGHT:
      case Direction.LEFT: {
        const right = direction === Direction.RIGHT
        this.grid.eachRow(row => {
          row
            .sort((tileA, tileB) => (right ? tileB.x - tileA.x : tileA.x - tileB.x))
            .forEach((tile, index, tiles) => {
              if (tile.x !== (right ? this.size - 1 : 0)) {
                if (index === 0) {
                  this.grid.setTileX(tile, right ? this.size - 1 : 0)
                } else {
                  const previousTile = tiles[index - 1]
                  if (previousTile.value === tile.value) {
                    this.grid.merge(previousTile, tile)
                  } else {
                    this.grid.setTileX(tile, right ? previousTile.x - 1 : previousTile.x + 1)
                  }
                }
              }
            })
        })
        break
      }
      default:
    }
  }
  // 清空棋盘，重新生成两个数
  resetTiles() {
    this.grid.resetTiles()
    for (let i = 0; i < 2; i++) {
      this.generateTile()
    }
  }
  // 更新棋盘，生成新数字
  updateTiles(dir: Direction) {
    this.grid.eachTile(tile => {
      tile.changed = false
      tile.merged = false
    })
    this.moveTiles(dir)
    if (this.grid.hasChanged()) this.generateTile()
  }
  getTiles() {
    return this.grid.getTiles()
  }
  getBoardSize() {
    return this.size + (this.size + 1) * this.getMarginSize()
  }
  getMarginSize() {
    return this.size / 20
  }
}
