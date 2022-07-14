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