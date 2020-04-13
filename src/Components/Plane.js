import React, { useState, useEffect } from "react";
import Card from "./Card";

const Plane = ({ cards, origins, handleUpdateOverlayData }) => {
  const [displayedCards, setDisplayedCards] = useState([cards]);
  const [selectedCard, setSelectedCard] = useState();

  const selectCard = (isActive, cardKey, name, imageUrl) => {
    if (isActive) {
      setSelectedCard();
    } else {
      console.log("Selecting card:", cardKey, name, imageUrl);
      setSelectedCard(cardKey);
    }
  };

  useEffect(() => {
    console.log("Currently selected card: " + selectedCard);
    handleUpdateOverlayData(selectedCard);
  }, [selectedCard]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color={"purple"} transparent />
      <Card
        name={"Colorless TestCard"}
        coords={origins.colorless}
        colorIdentity={[]}
        cmc={0}
        handleSelectCard={selectCard}
        id={"test-colorless"}
      />
      <Card
        name={"White TestCard"}
        coords={origins.white}
        colorIdentity={["W"]}
        colors={["White"]}
        cmc={1}
        handleSelectCard={selectCard}
        id={"test-white"}
      />
      <Card
        name={"Blue TestCard"}
        coords={origins.blue}
        colorIdentity={["U"]}
        colors={["Blue"]}
        cmc={1}
        handleSelectCard={selectCard}
        id={"test-blue"}
      />
      <Card
        name={"Black TestCard"}
        coords={origins.black}
        colorIdentity={["B"]}
        colors={["Black"]}
        cmc={1}
        handleSelectCard={selectCard}
        id={"test-black"}
      />
      <Card
        name={"Red TestCard"}
        coords={origins.red}
        colorIdentity={["R"]}
        colors={["Red"]}
        cmc={1}
        handleSelectCard={selectCard}
        id={"test-red"}
      />
      <Card
        name={"Green TestCard"}
        coords={origins.green}
        colorIdentity={["G"]}
        colors={["Green"]}
        cmc={1}
        handleSelectCard={selectCard}
        id={"test-green"}
      />
      ;
      {cards.map((card) => (
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
          handleSelectCard={selectCard}
        />
      ))}
    </mesh>
  );
};

export default Plane;
