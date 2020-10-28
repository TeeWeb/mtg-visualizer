import React, { useState, useEffect } from "react";
import axios from "axios"

import Card from "./Card";
import { getSynergisticCards, calcAvgPos } from "./Utils";

const Plane = ({ cards, origins, handleUpdateOverlayData }) => {
  const [allCards, setAllCards] = useState(cards);
  const [selectedCard, setSelectedCard] = useState();
  // TODO: Use cardCoordsWithSynergy to relocate orbs based on positions of synergistic cards
  // const [cardCoordsWithSynergy, setCardCoordsWithSynergy] = useState();

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
    imageUrl,
    multiverseId
  ) => {
    if (isActive) {
      setSelectedCard();
    } else {
      console.log("Selecting card:", cardKey, name, colorId, imageUrl, multiverseId);
      let synergizedCards = []
      allCards.forEach((card) => {
        // Remove cards that are missing multiverse IDs (usually duplicates anyways)
        if (card.multiverseid !== undefined) {
          if (card.multiverseid === multiverseId) {
            setSelectedCard(card)
          } else {
            synergizedCards.push({
              id: card.multiverseid,
              colors: card.colors,
              manaCost: card.manaCost,
              cmc: card.cmc,
              name: card.name,
              legalities: card.legalities,
              text: card.text,
              type: card.type,
              subtypes: card.subtypes,
              set: card.set,
              power: card.power,
              toughness: card.toughness
            })
          }
        }
      });
      axios.post('http://localhost:5000/api/synergize?card=' + multiverseId, {otherCards: synergizedCards}).then(response => {
        console.log(response.data)
        response.data
      }, error => {
        console.log(error)
      })
    }
  };

  const displayHoveredCard = (id) => {
    handleUpdateOverlayData(id)
  }

  const displaySelectedCard = (id) => {
    if (selectedCard !== undefined) {
      handleUpdateOverlayData(selectedCard.id)
    } else {
      handleUpdateOverlayData(id)
    }
  }

  useEffect(() => {
    // API includes many duplicate cards that don't have multiverse IDs. Need to "prune" the array of cards for further use.
    const prunedCards = []
    cards.forEach(rawCard => {
      if (rawCard.multiverseid) {
        prunedCards.push(rawCard)
      }
    });
    if (selectedCard === undefined) {
      setAllCards(prunedCards);
    } else {
      let filteredCards = getSynergisticCards(
        selectedCard.id,
        selectedCard.colorIdentity,
        selectedCard.supertypes,
        selectedCard.types,
        selectedCard.subtypes,
        selectedCard.text,
        prunedCards
      );
      filteredCards.push(selectedCard);
      setAllCards(filteredCards);
    }
  }, [cards, selectedCard, handleUpdateOverlayData]);

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
          handleHoverCard={displayHoveredCard}
          handleHoverOff={displaySelectedCard}
          supertypes={card.supertypes}
          types={card.types}
          subtypes={card.subtypes}
          text={card.text}
          multiverseId={card.multiverseid}
        />
      ))}
    </mesh>
  );
};

export default Plane;
