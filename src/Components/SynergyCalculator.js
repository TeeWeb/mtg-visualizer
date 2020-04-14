const synergyCalculator = (selectedCard, cards) => {
  if (!selectedCard) {
    return;
  } else {
    let synergy = selectedCard.synergy;
    console.log(selectedCard);

    const calcuateSynergy = (
      selectedCard,
      colorId,
      supertypes,
      types,
      subtypes,
      text
    ) => {
      let colorSynergy = calcColorSynergy(selectedCard, colorId);
    };

    const calcColorSynergy = (selectedCard, colorId) => {
      // Check for "synergy" in colors of the cards (colorless synergizes with all any color)
      let colorSynergy;
      if (selectedCard.colorIdentity.length === 0) {
        colorSynergy = 0;
      } else {
        selectedCard.colorIdentity.forEach((color) => {
          colorId.forEach((compareColor) => {
            if (compareColor === color) {
              colorSynergy = 1;
              return;
            }
          });
        });
      }
      // If no matching color and card is not colorless, subtract from synergy
      if (!colorSynergy) {
        colorSynergy = -1;
      }
      console.log("colorSynergy:", colorSynergy);
      return colorSynergy;
    };

    cards.forEach((card) => {
      synergy[card.id] = { synergyQuotient: 0 };
      console.log(synergy[card.id]);
      synergy[card.id].synergyQuotient = calcuateSynergy(
        selectedCard,
        card.colorIdentity,
        card.supertypes,
        card.types,
        card.subtypes,
        card.text
      );
    });

    console.log("Synergy:", synergy);

    return synergy;
  }
};

export default synergyCalculator;
