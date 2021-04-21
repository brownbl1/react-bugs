import { Item } from 'linked-list'

class Creature extends Item {
  constructor(world, x, y, ava) {
    super()

    this.world = world
    this.x = x
    this.y = y
    this.ava = ava
  }

  pos() {
    return [this.x, this.y]
  }

  toString() {
    return this.ava
  }
}

export class Ant extends Creature {
  constructor(world, x, y) {
    super(world, x, y, 'A')
    this.timeTillSpawn = 3
  }

  move() {
    const positions = getPositions(this.world.grid, this.x, this.y)
    const pos = emptyPosition(this.world.grid, positions)

    if (pos) {
      this.world.grid[this.x][this.y] = undefined

      const [x, y] = pos
      this.x = x
      this.y = y
      this.world.grid[x][y] = this
    }

    return this.next
  }

  spawn() {
    this.timeTillSpawn = this.timeTillSpawn - 1
    if (this.timeTillSpawn > 0) {
      return
    }

    this.timeTillSpawn = 3
    const positions = getPositions(this.world.grid, this.x, this.y)
    const emptyPos = emptyPosition(this.world.grid, positions)

    if (emptyPos && this.list) {
      const [x, y] = emptyPos
      const ant = new Ant(this.world, x, y)
      this.list.prepend(ant)
      this.world.grid[x][y] = ant
      this.world.numAnts = this.world.numAnts + 1
    }
  }
}

export class Doodlebug extends Creature {
  constructor(world, x, y) {
    super(world, x, y, 'D')
    this.health = 3
    this.timeTillSpawn = 5
  }

  move() {
    if (this.health === 1) {
      const next = this.next
      this.detach()
      this.world.grid[this.x][this.y] = undefined
      this.world.numBugs = this.world.numBugs - 1
      return next
    }

    const positions = getPositions(this.world.grid, this.x, this.y)
    let pos = positionWithAnt(this.world.grid, positions)
    let next = this.next

    if (pos) {
      const [x, y] = pos
      const ant = this.world.grid[x][y]

      if (next === ant) next = ant.next
      if (next === this) next = null

      ant.detach()
      this.world.grid[x][y] = undefined
      this.world.numAnts = this.world.numAnts - 1
      this.health = 3
    } else {
      pos = emptyPosition(this.world.grid, positions)
      this.health = this.health - 1
    }

    if (pos) {
      this.world.grid[this.x][this.y] = undefined

      const [x, y] = pos
      this.x = x
      this.y = y
      this.world.grid[x][y] = this
    }

    return next
  }

  spawn() {
    this.timeTillSpawn = this.timeTillSpawn - 1
    if (this.timeTillSpawn > 0) {
      return
    }

    this.timeTillSpawn = 5

    const positions = getPositions(this.world.grid, this.x, this.y)
    const emptyPos = emptyPosition(this.world.grid, positions)

    if (emptyPos && this.list) {
      const [x, y] = emptyPos
      const bug = new Doodlebug(this.world, x, y)
      this.list.prepend(bug)
      this.world.grid[x][y] = bug
      this.world.numBugs = this.world.numBugs + 1
    }
  }
}

const positionWithAnt = (grid, positions) => {
  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i]
    const location = grid[x][y]

    if (location && location.toString() === 'A') {
      return [x, y]
    }
  }
}

const emptyPosition = (grid, positions) => {
  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i]
    const location = grid[x][y]

    if (!location) {
      return [x, y]
    }
  }
}

const getPositions = (grid, x, y) => {
  const size = grid.length
  const pos = []
  if (x - 1 >= 0 && y - 1 >= 0) {
    pos.push([x - 1, y - 1])
  }

  if (x - 1 >= 0) {
    pos.push([x - 1, y])
  }

  if (y - 1 >= 0) {
    pos.push([x, y - 1])
  }

  if (x + 1 < size && y + 1 < size) {
    pos.push([x + 1, y + 1])
  }

  if (x + 1 < size) {
    pos.push([x + 1, y])
  }

  if (y + 1 < size) {
    pos.push([x, y + 1])
  }

  if (x + 1 < size && y - 1 >= 0) {
    pos.push([x + 1, y - 1])
  }

  if (x - 1 >= 0 && y + 1 < size) {
    pos.push([x - 1, y + 1])
  }

  return shuffle(pos)
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}