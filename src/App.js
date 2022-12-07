import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import AddGame from './components/AddGame';
import GameCard from './components/GameCard';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [gameCollection, addGameCollection] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [gameCondition, setGameCondition] = useState('');

  // ownedGames is the initial data hard coded into the project
  // {gameTitle:'', gameConsole:'', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/'},
  // Conditions: MISB, CIB, Incomplete, Loose, Damaged

  const ownedGames = [
    // Game Boy 1989
    {
      gameTitle: 'Metroid II: Return of Samus',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'Damaged',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/metroidIIReturnOfSamus.jpg',
    },
    {
      gameTitle: 'Trax',
      gameConsole: 'Nintendo Game Boy',
      gameCondition: 'CIB',
      releaseYear: 1991,
      id: nanoid(),
      image: 'images/trax.jpg',
    },

    // PS1 1994

    // Game Boy Color 1998

    {
      gameTitle: 'Metal Gear Solid',
      gameConsole: 'Nintendo Game Boy Color',
      gameCondition: 'Loose',
      releaseYear: 2000,
      id: nanoid(),
      image: 'images/metalGearSolidGB.jpg',
    },

    // PS2 2000

    // Nintendo Gamecube 2001
    {
      gameTitle: 'Metroid Prime',
      gameConsole: 'Nintendo Gamecube',
      gameCondition: 'CIB',
      releaseYear: 2002,
      id: nanoid(),
      image: 'images/metroidPrime.jpg',
    },
    // Game Boy Advance 2001

    // DS 2004
    {
      gameTitle: 'Pokémon HeartGold',
      gameConsole: 'Nintendo DS',
      gameCondition: 'Incomplete',
      releaseYear: 2009,
      id: nanoid(),
      image: 'images/pokemonHeartGold.jpg',
    },
    {
      gameTitle: 'Pokémon SoulSilver',
      gameConsole: 'Nintendo DS',
      gameCondition: 'CIB',
      releaseYear: 2009,
      id: nanoid(),
      image: 'images/pokemonSoulSilver.jpg',
    },
    {
      gameTitle: 'Radiant Historia',
      gameConsole: 'Nintendo DS',
      gameCondition: 'MISB',
      releaseYear: 2010,
      id: nanoid(),
      image: 'images/radiantHistoria.jpg',
    },

    // PS3 2006

    // Wii 2006
    {
      gameTitle: 'Xenoblade Chronicles',
      gameConsole: 'Nintendo Wii',
      gameCondition: 'CIB',
      releaseYear: 2010,
      id: nanoid(),
      image: 'images/xenobladeChronicles.jpg',
    },

    // 3DS 2011

    // Wii U 2012

    // Switch 2017
    // {gameTitle:'', gameConsole:'', gameCondition:'', releaseYear:2000, id:nanoid(), image:'images/'},
  ];

  useEffect(() => {
    if(localStorage){
      const gameLibraryLS = JSON.parse(localStorage.getItem('gameLibrary'));
      if(gameLibraryLS){
        saveGames(gameLibraryLS);
      }else{
        saveGames(ownedGames);
      }
    }
  }, []);

  const saveGames = (ownedGames) => {
    addGameCollection(ownedGames);
    setSearchResults(ownedGames);
    if (localStorage){
      localStorage.setItem('gameLibrary', JSON.stringify(ownedGames));
      console.log('Saved to local storage.');
    }
  };

  const addGame = (newGame) => {
    const updatedGameCollection = [...gameCollection, newGame];
    saveGames(updatedGameCollection);
  };

  const searchGamesWork = () => {
    let keywordArray = [];

    if (keywords) {
      keywordArray = keywords.toLowerCase().split(' ');
    }

    if (gameCondition) {
      keywordArray.push(gameCondition);
    }

    if (keywordArray.length > 0) {
      const searchResults = gameCollection.filter((game) => {
        for (const word of keywordArray) {
          if (
            game.gameTitle.toLowerCase().includes(word) ||
            game.gameConsole.toLowerCase().includes(word) ||
            game.gameCondition.toLowerCase() === word.toLowerCase()
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(gameCollection);
    }
  };

  const removeGame = (gameToDelete) => {
    console.table(gameToDelete);
    const postGameDelete = gameCollection.filter((game) => game.id !== gameToDelete.id);
    saveGames(postGameDelete);
  };

  const updateGame = (updatedGameData) => {
    const updatedGameCollection = gameCollection.map(game => game.id === updatedGameData.id ? {...game,...updatedGameData} : game);
    saveGames(updatedGameCollection);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <label htmlFor="txtKeywords" className="form-label">
              Search Title, Console
            </label>
            <input
              type="text"
              name="txtKeywords"
              id="txtKeywords"
              className="form-control"
              onChange={(evt) => setKeywords(evt.currentTarget.value)}
              value={keywords}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Select Condition
            </label>
            <select
              value={gameCondition}
              name=""
              id=""
              className="form-select"
              onChange={(evt) => setGameCondition(evt.currentTarget.value)}
            >
              <option value=""> All Conditions </option>
              {_(gameCollection)
                .map((game) => game.gameCondition)
                .sort()
                .uniq()
                .map((gameCondition) => (
                  <option key={gameCondition} value={gameCondition}>
                    {gameCondition}
                  </option>
                ))
                .value()}
            </select>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-lg btn-primary mt-4" onClick={searchGamesWork}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <div className="row">
          {searchResults &&
            searchResults.map((game) => (
              <div className="col-md-2" key={game.id}>
                <GameCard game={game} removeGame={removeGame} updateGame={updateGame} />
              </div>
            ))}
        </div>
        <AddGame addGame={addGame} />
      </div>
    </>
  );
}

export default App;
