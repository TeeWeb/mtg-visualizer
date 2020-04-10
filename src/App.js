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
import Overlay from "./Components/Overlay";
import { update } from "react-spring/three";

const App = () => {
  extend({ OrbitControls });
  const [cards, setCards] = useState([]);
  const [overlayData, setOverlayData] = useState([]);
  // const [activeColors, setActiveColors] = useState([]);

  const origins = {
    colorless: [0, 0, 0],
    white: [0, 0, 100],
    blue: [95, 0, 31],
    black: [-59, 0, -81],
    red: [59, 0, -81],
    green: [-95, 0, -31],
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

  const updateOverlayData = (name, imageUrl) => {
    let updatedOverlayData = {
      name: name,
      imageUrl: imageUrl,
    };
    console.log("Updating Overlay Data: ", name, imageUrl);
    setOverlayData(updatedOverlayData);
    return updatedOverlayData;
  };

  // const updateActiveColors = (activeColors) => {
  //   console.log(activeColors);
  //   let cardArray = [];
  //   mtg.card
  //     .all({ colorIdentity: activeColors, set: "ELD" })
  //     .on("data", (card) => {
  //       cardArray.push(card);
  //     });
  //   console.log(cardArray);

  //   setCards(cardArray);
  // };

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
        <Plane
          cards={cards}
          origins={origins}
          handleUpdateOverlayData={(name, imageUrl) =>
            updateOverlayData(name, imageUrl)
          }
        />
        <ambientLight intensity={0.75} />
        <spotLight position={[0, 100, 150]} penumbra={0.15} castShadow />
      </Canvas>
      <GUI handleUpdateCards={() => requestCards} />
      <Overlay name={overlayData.name} imageUrl={overlayData.imageUrl} />
    </div>
  );
};

render(React.createElement(App), document.getElementById("root"));
