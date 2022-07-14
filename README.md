react-monsters-v2

steps to take

SETTING UP THE APP

Create the App.js.
Enter the styling into the index.css: 
```
body {
 margin: 0;
 padding: 0;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
   'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
   sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 background: linear-gradient(to left,
     rgba(7, 27, 82, 1) 0%,
     rgba(0, 128, 128, 1) 100%);
 text-align: center;
}
 
.app-title {
 margin-top: 75px;
 margin-bottom: 50px;
 font-size: 76px;
 color: #0ccac4;
 font-family: 'Bigelow Rules';
}
 
.search-box {
 -webkit-appearance: none;
 border: none;
 outline: none;
 padding: 10px;
 width: 150px;
 line-height: 30px;
 margin-bottom: 30px;
}
 
.card-list {
 width: 85vw;
 margin: 0 auto;
 display: grid;
 grid-template-columns: 1fr 1fr 1fr 1fr;
 grid-gap: 20px;
}
 
.card-container {
 display: flex;
 flex-direction: column;
 background-color: #95dada;
 border: 1px solid grey;
 border-radius: 5px;
 padding: 25px;
 cursor: pointer;
 -moz-osx-font-smoothing: grayscale;
 backface-visibility: hidden;
 transform: translateZ(0);
 transition: transform 0.25s ease-out;
}
 
.card-container:hover {
 transform: scale(1.05);
}
```
FETCHING AND DISPLAYING THE MONSTER NAMES

Inside App() fetch the monsters data from the Api: 
https://jsonplaceholder.typicode.com/users
Import useState. 
Set the “users” as the current state of monsters. 
Map the monsters’ name in an h1 inside return statement. 

App: 
```
import { useState } from 'react'
 
function App() {
 
   const [monsters, setMonsters] = useState([])
 
   fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(users => setMonsters(users))
 
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

```

MAKING THE SEARCH BOX COMPONENT

Create the components folder. 
Create the SearchBox component.
Import useState and useEffect
Make a useState hook to track the input text.
Handle the change in input with the handleChange() function and set the state with useState. 
Inside a useEffect hook filter the monsters according to the input text and store them in a constant. 
Go to the App.js
With a useState hook track the filtered monsters. 
Instead of monsters, now map the filtered monsters. 

SearchBox: 
```
import { useState, useEffect } from 'react'
 
function SearchBox({
   className,
   placeholder,
   setFilteredMonsters,
   monsters
}) {
 
   // Input tracker
   const [searchText, setSearchText] = useState('')
 
   // Handle search input
   function handleChange(e) {
       setSearchText(e.target.value.toLocaleLowerCase())
   }
 
   // Filter Monsters
   useEffect(() => {
       const newFilteredMonsters = monsters.filter((monster) => {
           return monster.name.toLocaleLowerCase().includes(searchText);
       });
 
       setFilteredMonsters(newFilteredMonsters);
   }, [monsters, searchText]);
 
   return (
       <input
           className={className}
           type="search"
           placeholder={placeholder}
           onChange={handleChange}
       />
   )
}
 
export default SearchBox
```
App: 

```
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
```
MAKING THE CARD LIST COMPONENT

Create the CardList component. 
Map the filteredMonsters inside the return statement. 
Import CardList inside App. 

CardList: 
```
function CardList({ filteredMonsters }) {
   return (
       <div className='card-list'>
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
 
export default CardList
```
App: 
```
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
```

MAKING THE CARD COMPONENT

Create the Card component. 
Import the Card inside the CardList. 
Map the monsters inside the Card component. 
Add img, name and email from the coming data. 

Card: 
```
function Card({ monster }) {
 
   const { id, name, email } = monster;
 
   return (
       <div className='card-container'>
           <img
               alt={`monster ${name}`}
               src={`https://robohash.org/${id}?set=set2&size=180x180`}
           />
           <h2>{name}</h2>
           <p>{email}</p>
       </div>
   )
}
 
export default Card
```
CardList:
```
import Card from "./Card"
 
function CardList({ filteredMonsters }) {
   return (
       <div className='card-list'>
           {filteredMonsters.map(monster => {
               return (
                   <Card key={monster.id} monster={monster} />
               )
           })}
       </div>
   )
}
 
export default CardList
```
App:
```
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

```




