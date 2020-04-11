import React, { useState, useEffect } from "react";
import Card from "./Card";

const Plane = ({ cards, origins, handleUpdateOverlayData }) => {
  const [displayedCards, setDisplayedCards] = useState([cards]);
  const [selectedCard, setSelectedCard] = useState({});

  const selectCard = (cardKey, name, imageUrl) => {
    console.log("Selecting card: ", cardKey, name);
    if (cardKey === selectedCard) {
      setSelectedCard();
      handleUpdateOverlayData("", undefined);
    } else {
      setSelectedCard(cardKey);
      handleUpdateOverlayData(name, imageUrl);
    }
  };

  useEffect(() => {}, [selectedCard]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color={"purple"} transparent />
      <Card
        name={"Colorless TestCard"}
        coords={origins.colorless}
        colorIdentity={[]}
        cmc={0}
      />
      <Card
        name={"White TestCard"}
        coords={origins.white}
        colorIdentity={["W"]}
        colors={["White"]}
        cmc={1}
      />
      <Card
        name={"Blue TestCard"}
        coords={origins.blue}
        colorIdentity={["U"]}
        colors={["Blue"]}
        cmc={1}
      />
      <Card
        name={"Black TestCard"}
        coords={origins.black}
        colorIdentity={["B"]}
        colors={["Black"]}
        cmc={1}
      />
      <Card
        name={"Red TestCard"}
        coords={origins.red}
        colorIdentity={["R"]}
        colors={["Red"]}
        cmc={1}
      />
      <Card
        name={"Green TestCard"}
        coords={origins.green}
        colorIdentity={["G"]}
        colors={["Green"]}
        cmc={1}
      />
      ;
      {cards.length === 0
        ? alert("Submit a search")
        : cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              coords={origins.colorless}
              colors={card.colors}
              cmc={card.cmc}
              name={card.name}
              colorIdentity={card.colorIdentity}
              manaCost={card.manaCost}
              power={card.power}
              toughness={card.toughness}
              imageUrl={card.imageUrl}
              handleSelectCard={() =>
                selectCard(card.id, card.name, card.imageUrl)
              }
            />
          ))}
    </mesh>
  );
};

export default Plane;
