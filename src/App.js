import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import mtg from "mtgsdk";

import Card from "./Components/Card";
import Controls from "./Components/Controls";
import Plane from "./Components/Plane";
import GUI from "./Components/GUI";
import Results from "./Components/Results";

const App = () => {
  extend({ OrbitControls });
  const [cards, setCards] = useState([]);
  const [activeColors, setActiveColors] = useState([]);

  const origins = {
    colorless: [0, 0, 0],
    white: [100, 0, 0],
    blue: [31, 0, 95],
    black: [-81, 0, -59],
    red: [-81, 0, 59],
    green: [31, 0, -95],
  };

  async function requestCards(activeColors, colorOperator, keyword, type) {
    console.log(
      "Requesting Cards: ",
      activeColors,
      colorOperator,
      keyword,
      type
    );
    const cardData = await mtg.card
      .where({
        set: "WAR",
        type: type,
      })
      .then((res) => {
        return res;
      });

    setCards(cardData || []);
  }

  const updateActiveColors = (activeColors) => {
    console.log(activeColors);
    let cardArray = [];
    mtg.card
      .all({ colorIdentity: activeColors, set: "ELD" })
      .on("data", (card) => {
        cardArray.push(card);
      });
    console.log(cardArray);

    setCards(cardArray);
  };

  console.log(cards);

  useEffect(() => {
    setCards([]);
  }, [setCards]);

  return (
    <div>
      <Canvas
        shadowMap
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <fog attach="fog" args={["gray", 250, 400]} />
        <Controls />
        <Card coords={origins.white} colors={["White"]} cmc={1} />
        <Card coords={origins.blue} colors={["Blue"]} cmc={3} />
        <Card coords={origins.black} colors={["Black"]} cmc={5} />
        <Card coords={origins.red} colors={["Red"]} cmc={2} />
        <Card coords={origins.green} colors={["Green"]} cmc={2} />
        <Plane cards={cards} origins={origins} />
        <ambientLight intensity={0.75} />
        <spotLight position={[150, 50, 0]} penumbra={0.15} castShadow />
      </Canvas>
      <GUI
        handleUpdateCards={(activeColors, colorOperator, keyword) =>
          requestCards
        }
      />
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
