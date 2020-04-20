import React, { useState, useEffect } from "react";
import { useSpring, a } from "react-spring/three";
import Card from "./Card";
import {
  getSynergisticCardCoords,
  getSynergisticCards,
  calcAvgPos,
} from "./Utils";

const Plane = ({ cards, origins, handleUpdateOverlayData }) => {
  const [allCards, setAllCards] = useState(cards);
  const [selectedCard, setSelectedCard] = useState();
  const [cardCoordsWithSynergy, setCardCoordsWithSynergy] = useState();

  const selectCard = (
    isActive,
    cardKey,
    name,
    cmc,
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
      cards.forEach((card) => {
        if (card.id === cardKey) {
          setSelectedCard(card);
        }
      });
    }
  };

  useEffect(() => {
    if (selectedCard === undefined) {
      setAllCards(cards);
    } else {
      console.log("Currently selected card:", selectedCard);
      let filteredCards = getSynergisticCards(
        selectedCard.id,
        selectedCard.colorIdentity,
        selectedCard.supertypes,
        selectedCard.types,
        selectedCard.subtypes,
        selectedCard.text,
        cards
      );
      filteredCards.push(selectedCard);
      setAllCards(filteredCards);
      console.log(filteredCards);
      handleUpdateOverlayData(selectedCard.id);
    }
    if (cardCoordsWithSynergy != undefined) {
      console.log("Average synergy coord:", calcAvgPos(cardCoordsWithSynergy));
    }
  }, [cards, selectedCard, cardCoordsWithSynergy]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial
        attach="material"
        color={"silver"}
        transparent
        opacity={0.1}
      />
      {allCards.map((card) => (
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
