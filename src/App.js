import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'

function App() {

  // Monster trackers
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  // Get monsters
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, [])

  return (
    <div>
      <SearchBox
        className="search-box"
        placeholder="search monsters"
        setFilteredMonsters={setFilteredMonsters}
        monsters={monsters}
      />

      {filteredMonsters.map(monster => {
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