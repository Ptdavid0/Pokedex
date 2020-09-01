import React, { useState } from "react";
import "./styles.scss";
import { useEffect } from "react";
import { api } from "../../services/Api";

const Card = (props) => {
  const [pokeData, setPokeData] = useState([]);

  const pokemon = props.pokemon;

  useEffect(() => {
    api.get(`/pokemon/${pokemon.name}`).then((response) => {
      console.log(response.data);
      setPokeData(response.data);
    });
  }, []);

  console.log(pokeData.types);

  return (
    <div className="container">
      <div className="innerContainer">
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`}
          alt="Pokemon"
        />
        <h1>{pokeData.name}</h1>

        <h2>{pokeData.base_experience}</h2>
        <h3>
          {pokeData &&
            pokeData.types &&
            pokeData.types.map((type) => type.type.name)}
        </h3>
        {/* <h3>{pokeData.types.map((type) => " " + type.type.name).toString()}</h3> */}
      </div>
    </div>
  );
};

export default Card;
