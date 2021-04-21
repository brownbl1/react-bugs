import { useEffect, useState } from 'react'
import './App.css'

const Monster = ({ name, armorClass, alignment }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>Class: {armorClass}</div>
      <div>Alignment: {alignment}</div>
    </div>
  )
}

const _monsters = [
  {
    name: 'Ny Name 0',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 1',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 3',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 4',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 5',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 6',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
  {
    name: 'Ny Name 7',
    armorClass: 'My Armor Class',
    alignment: 'My Alignment',
  },
]

const MonsterList = () => {
  const [monsters, setMonsters] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setMonsters(_monsters)
    }, 3000)
  }, [])

  const filtered = monsters.slice(0, 4)

  return (
    <>
      {!!filtered.length &&
        filtered.map((m) => (
          <Monster
            name={m.name}
            armorClass={m.armorClass}
            alignment={m.alignment}
          />
        ))}

      {!filtered.length && <div>Loading...</div>}
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MonsterList />
      </header>
    </div>
  )
}

export default App
