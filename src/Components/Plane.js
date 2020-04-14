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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial
        attach="material"
        color={"silver"}
        transparent
        opacity={0.1}
      />
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
