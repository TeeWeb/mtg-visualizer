import React, { useState, useEffect } from "react";
import Card from "./Card";

const Plane = ({ cards, origins }) => {
  const [displayedCards, setDisplayedCards] = useState([cards]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color={"white"} transparent />
      <Card coords={origins.colorless} colors={["silver"]} cmc={0} />;
      {cards.length === 0
        ? alert("Submit a search")
        : cards.map((card) => (
            <Card
              key={card.multiverseid}
              coords={origins.colorless}
              colors={card.colors}
              cmc={card.cmc}
              name={card.name}
            />
          ))}
    </mesh>
  );
};

export default Plane;
