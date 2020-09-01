import React, { useEffect, useState } from "react";
import { api } from "../../services/Api";
import Card from "../../components/Card";
import "./styles.scss";
import Paginator from "react-hooks-paginator";

export const Pokedex = () => {
  //Initial data
  const [pokemons, setPokemons] = useState([]);
  const [show, setShow] = useState([]);

  //Search
  const [searchItem, setSearchItem] = useState("");

  //Paginator
  const pageLimit = 20;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //Api request
  useEffect(() => {
    api.get("pokemon?limit=200").then((data) => {
      setPokemons(data.data.results);
    });
  }, []);

  useEffect(() => {
    if (searchItem === "") {
      setShow(pokemons.slice(offset, offset + pageLimit));
    } else {
      const results = pokemons.filter((pokemon) =>
        pokemon.name.includes(searchItem.toLowerCase())
      );
      setShow(results);
    }
  }, [searchItem, pokemons, offset]);

  const handleInputChange = (data) => {
    setSearchItem(data);
  };

  return (
    <div className="mainContainer">
      <h1>Pokedex</h1>

      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Name"
          name="name"
          id="name"
          value={searchItem}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Name
        </label>
      </div>
      <div className="pokemonCards">
        {show.map((pokemon) => {
          return <Card pokemon={pokemon} key={pokemon.name} />;
        })}
      </div>
      <Paginator
        totalRecords={pokemons.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
