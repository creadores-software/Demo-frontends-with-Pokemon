import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  }

  const handleSearchSubmit = event => {
    event.preventDefault();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="searchQuery">Search for a Pokemon:</label>
        <input
          id="searchQuery"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
