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