import { useState } from 'react'

function App() {

  const [monsters, setMonsters] = useState([])

  async function getMonsters() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    setMonsters(data)
    console.log(monsters)
  }

  getMonsters()

  return (
    <div>
      {monsters.map(monster => {
        return (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default App