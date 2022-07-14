import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import CardList from './components/CardList'

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

      <CardList
        filteredMonsters={filteredMonsters}
      />
    </div>
  )
}

export default App