import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch(console.log);
  }, []);

  const handleSearchSubmit = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log('response.data :>> ', response.data);
        setPokemonData(response.data);
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <div className="title">
        <h1 className="font">Pokemon List</h1>
        <input
          className="font"
          placeholder="Type a pokemon name..."
          value={searchQuery}
          onChange={({ target: { value } }) => {
            setSearchQuery(value);
          }}
        ></input>
      </div>
      <div className="inner-container">
        <div className={pokemonData ? "pokemon-detail " : "hide"}>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData?.id}.svg`}
            width={360}
            height={400}
            alt={pokemonData?.id}
          />
          <h2 className="center font">{pokemonData?.name} </h2>
          <div className="types font">
            <h3 className="center">Type(s)</h3>
            {pokemonData?.types?.map(({ type }) => (
              <div>{type.name}</div>
            ))}
          </div>
          <br />
          <div className="abilities font">
            <h3 className="center">abilities</h3>
            {pokemonData?.abilities?.map(({ ability }) => (
              <div>{ability.name}</div>
            ))}
          </div>
        </div>
        <div className="pokemon-list">
          {pokemonList
            .filter(({ name }) => name.includes(searchQuery))
            .map(({ name, url }) => {
              const id = url.match(/\/(\d+)\/$/)[1];
              return (
                <div
                  onClick={() => {
                    handleSearchSubmit(url);
                  }}
                  className="pokemon-item"
                  key={name}
                >
                  #{id.padStart(3, "0")} {name}
                  <img
                    alt={name}
                    className="pokemon-img"
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                    height={25}
                    width={25}
                  />
                </div>
              );
            })}
        </div>
      </div>
=======
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

