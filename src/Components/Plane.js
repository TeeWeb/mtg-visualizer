import React, { useState, useEffect } from "react";
import Card from "./Card";
import { synergyCalculator } from "./Utils";

const Plane = ({ cards, origins, handleUpdateOverlayData }) => {
  const [selectedCard, setSelectedCard] = useState();
  const [cardsWithSynergy, setCardsWithSynergy] = useState([]);

  const selectCard = (
    isActive,
    cardKey,
    name,
    colorId,
    supertypes,
    types,
    subtypes,
    text,
    imageUrl
  ) => {
    if (isActive) {
      setSelectedCard();
    } else {
      console.log("Selecting card:", cardKey, name, colorId, imageUrl);
      setSelectedCard(cardKey);
      setCardsWithSynergy(
        synergyCalculator(
          cardKey,
          colorId,
          supertypes,
          types,
          subtypes,
          text,
          cards
        )
      );
    }
  };

  useEffect(() => {
    console.log("Currently selected card: " + selectedCard);
    console.log("Number of Cards w/ Synergy: " + cardsWithSynergy.length);
    handleUpdateOverlayData(selectedCard);
  }, [selectedCard, cardsWithSynergy]);

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
          supertypes={card.supertypes}
          types={card.types}
          subtypes={card.subtypes}
          text={card.text}
        />
      ))}
    </mesh>
  );
};

export default Plane;
