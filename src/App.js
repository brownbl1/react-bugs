import { List } from 'linked-list'
import { useEffect, useState } from 'react'
import './App.css'
import { Ant, Doodlebug } from './Creature'

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const seed = (numAnts, numBugs, gridSize) => {
  const grid = []

  for (let i = 0; i < gridSize; i++) {
    grid.push(new Array(gridSize).fill(undefined))
  }

  const getRandom = () => randomIntFromInterval(0, gridSize - 1)
  const getSpot = () => {
    while (true) {
      const x = getRandom()
      const y = getRandom()

      if (!grid[x][y]) {
        return [x, y]
      }
    }
  }

  const list = new List()
  const world = { grid, list, numAnts, numBugs }

  for (let i = 0; i < numAnts; i++) {
    const [x, y] = getSpot()
    const a = new Ant(world, x, y)
    list.append(a)
    grid[x][y] = a
  }

  for (let i = 0; i < numBugs; i++) {
    const [x, y] = getSpot()
    const a = new Doodlebug(world, x, y)
    list.append(a)
    grid[x][y] = a
  }

  return world
}

const world = seed(20, 5, 10)

function App() {
  const [step, setStep] = useState(0)
  const [doneText, setDoneText] = useState('')

  useEffect(() => {
    setTimeout(() => {
      let curr = world && world.list.head
      while (curr) {
        const next = curr.move()
        curr.spawn()

        curr = next
      }

      if (world && !world.numAnts) {
        setDoneText('Bugs win!')
        return
      } else if (world && !world.numBugs) {
        setDoneText('Ants win!')
        return
      }

      if (world && world.numAnts && world.numBugs) {
        setStep(step + 1)
      }
    }, 500)
  }, [world, step])

  return (
    <div className="App">
      <div className="grid">
        {world &&
          world.grid.map((row, i) => {
            return (
              <div key={`row-${i}`} className="row">
                {row.map((cell, j) => {
                  const c = cell && cell.toString()
                  return (
                    <div key={`cell-${j}`} className={`cell ${c}`}>
                      {c}
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>
      <div>step: {step}</div>
      <div>bugs: {world && world.numBugs}</div>
      <div>ants: {world && world.numAnts}</div>
      <div>{doneText}</div>
    </div>
  )
}

export default App
