import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const CharacterDetails = ({ characters }) => {
    const [singleCharacter, setSingleCharacter] = useState({});
    const { id } = useParams();
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(true)

    const fetchCharacter = async () => {
        const res = await fetch(`https://api.sampleapis.com/futurama/characters/${id}`);

        // if(!res.ok){
        //     setError(true)
        // }

        const data = await res.json();

        const characterRef = {
            first_name: data.name.first,
            middle_name: data.name.middle,
            last_name: data.name.last,
            age: data.age,
            occupation: data.occupation,
            image_url: data.images.main,
            species: data.species,
            quotes: data.sayings
        };

        setSingleCharacter(characterRef);
        // setError(false);
        // setIsLoading(false)




    }


    useEffect(() => {
        fetchCharacter()
    }, []);


    return (
        <>
            <div className="character-detail-con">
                <div className="charater-detail-img">
                    <img src={singleCharacter.image_url} alt="" />
                </div>

                <div className="charater-detail-text">
                    <ul>
                        <li>Name: <span>{singleCharacter.first_name} {singleCharacter.middle_name} {singleCharacter.last_name}</span></li>

                        <li>Age: <span>{singleCharacter.age}</span></li>

                        <li>Occupation: <span>{singleCharacter.occupation}</span></li>

                        <li>Species: <span>{singleCharacter.species}</span></li>
                    </ul>

                    <h2 className="character-quote-title">{singleCharacter.first_name} Quotes: </h2>

                    { singleCharacter.quotes && singleCharacter.quotes.map((quote)=>{
                        return (<li className="quotes">{ quote }</li>)
                    }) } 

                    
                </div>

            </div>

            <Link to='/' className="go-back">Go back home</Link>

        </>


    );
}



export default CharacterDetails;