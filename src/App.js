import './Global/GlobalStyle.css';
import Wrapper from './components/Layout/Wrapper';
import Header from './components/Layout/Header';
import SearchBar from './components/Layout/Search/SearchCharacter';
import CharacterList from './components/Character/CharacterList';
import React, { useEffect, useState } from 'react';
import CharacterDetails from './components/Character/CharacterDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {

  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [displayDetails, setDisplayDetails] = useState(false);

  const fetchData = async () => {

    try {
      const res = await fetch("https://api.sampleapis.com/futurama/characters");
      const data = await res.json();

      const characterData = [];

      if (!res.ok) {
        throw new Error("Something is not right or went left!");
      }





      for (const key in data) {
        characterData.push({
          id: parseInt(key) + 1,
          age: data[key].age,
          first_name: data[key].name.first,
          middle_name: data[key].name.middle,
          last_name: data[key].name.last,
          occupation: data[key].occupation,
          image_url: data[key].images.main,
          species: data[key].species,
          quotes: data[key].sayings
        });

        setCharacters(characterData);
      }
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false);

  };



  useEffect(() => {
    fetchData()
  }, [])

  // const handleFilter = () =>{
  //   const filteredData = characters.filter((character) =>{
  //     character.name
  //   })
  // }


  // 
  //   const hideDetails = () => {
  //     setDisplayDetails(false);
  //   }
  // 
  //   const showDetails = () => {
  //     setDisplayDetails(true);
  //   }
  // 




  return (
    <Router>
      <Wrapper>
        <Header />
        <SearchBar />
        <Switch>
          <Route exact path="/">

            <CharacterList characters={characters} />
            {isLoading && <p className='loading-p l'>Loading Futurama Characters..</p>}
            {error && <p className='loading-p l'>An error occured while fetching character, kindly try again...</p>}
            {error && <p className='loading-p l'>{error}</p>}
          </Route>

          <Route path="/characters/:id">
            <CharacterDetails />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

      </Wrapper>

    </Router>
  );
}

export default App;
