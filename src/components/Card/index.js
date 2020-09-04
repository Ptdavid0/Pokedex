import React, { useState, useEffect } from "react";
import "./styles.scss";
import { api } from "../../services/Api";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Card = (props) => {
  const pokemon = props.pokemon;

  //Basic Pokemon Info
  const [pokeData, setPokeData] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeName, setPokeName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  //Species Info
  const [baseHappiness, setBaseHappiness] = useState(0);
  const [captureRate, setCaptureRate] = useState(0);
  const [description, setDescription] = useState("");

  //React Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    api.get(`/pokemon/${pokemon.name}`).then((response) => {
      // console.log(response.data);
      setPokeData(response.data);
    });
  }, [pokemon.name]);

  useEffect(() => {
    api
      .get(pokeData && pokeData.id && `/pokemon-species/${pokeData.id}`)
      .then((response) => {
        console.log(response.data);
        setBaseHappiness(response.data.base_happiness);
        setCaptureRate(response.data.capture_rate);
        setDescription(
          response &&
            response.data &&
            response.data.flavor_text_entries &&
            response.data.flavor_text_entries[0].flavor_text.replace(
              /\uFFFE/g,
              ""
            )
        );
      });
  }, [pokeData]);

  useEffect(() => {
    pokeData &&
      pokeData.types &&
      pokeData.types.map((type) => {
        setPokeTypes([...pokeTypes, type.type.name]);
      });
    setPokeName(
      pokeData &&
        pokeData.name &&
        pokeData.name[0].toUpperCase() + pokeData.name.slice(1)
    );

    setHeight(pokeData.height / 10);
    setWeight(pokeData.weight / 10);
  }, [pokeData]);

  return (
    <>
      <div
        className={["poke-card", pokeTypes[0]].join(" ")}
        onClick={handleShow}
      >
        <div className="image-container">
          <img
            src={
              pokeData &&
              pokeData.id &&
              `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`
            }
            alt="Pokemon"
          />
        </div>
        <h1 className="poke-name">{pokeName}</h1>
        <h3 className="poke-number">#{pokeData.id}</h3>
        <div className="div-pokeTypes">
          Type:
          {pokeData &&
            pokeData.types &&
            pokeData.types.map((type) => {
              return (
                <span
                  className={["pokemon-types", type.type.name].join(" ")}
                  key={type.type.name}
                >
                  {type.type.name}
                </span>
              );
            })}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-header">
            <img
              className=" modal-image"
              src={
                pokeData &&
                pokeData.id &&
                `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`
              }
              alt="Pokemon"
            />

            <div>{pokeName}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <div className="basic-modal-info">
            <div>
              <strong className={`${pokeTypes[0]}-color`}>Weight</strong>
              <p>{weight}.0kg</p>
            </div>
            <div>
              <strong className={`${pokeTypes[0]}-color`}>Height</strong>
              <p>{height}.0m</p>
            </div>
            <div>
              <strong className={`${pokeTypes[0]}-color`}> Happiness</strong>
              <p>{baseHappiness}</p>
            </div>
            <div>
              <strong className={`${pokeTypes[0]}-color`}>Capture Rate</strong>
              <p>{captureRate}</p>
            </div>
          </div>
          <div className="modal-description">Description: {description}</div>
          <div className="modal-pokemon-stats"></div>
          <span>
            Abilities:
            {pokeData &&
              pokeData.abilities &&
              pokeData.abilities.map((ability) => {
                return `${ability.ability.name} `;
              })}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
