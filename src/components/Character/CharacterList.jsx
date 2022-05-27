import { Link } from "react-router-dom";


const CharacterList = ({ characters }) => {
    return (
        <div className="character-list" >
            {characters.map(character => {
                return (
                    <Link to={ `/characters/${character.id}` }>
                        <div className="character-card" key={character.id}>
                            <div>
                                <img src={character.image_url} alt={character.first_name}/>
                            </div>

                            <p className="loading-p">{character.first_name} {character.middle_name} {character.last_name}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default CharacterList;