import React, { useState, useRef, useEffect } from "react";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "react-three-fiber";

import {
  normalizeColors,
  convertCmcToYValue,
  convertColorIdsToPosArrays,
  calcAvgPos,
} from "./Utils";
import "./Card.css";

const Card = ({
  name,
  id,
  coords,
  colors,
  colorIdentity,
  cmc,
  manaCost,
  power,
  toughness,
  imageUrl,
  handleSelectCard,
}) => {
  const threeJSColors = normalizeColors(colorIdentity);
  const initialCoordsArray = convertColorIdsToPosArrays(colorIdentity);
  const averagedCoords = calcAvgPos(initialCoordsArray);
  const calculatedPosition = [
    averagedCoords[0],
    averagedCoords[1],
    convertCmcToYValue(cmc),
  ];

  const meshRef = useRef();
  const baseScale = [1, 1, 1];
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  // const [isColorless, setColorless] = useState(false);

  const props = useSpring({
    scale:
      active || hovered
        ? [baseScale[0] * 3, baseScale[1] * 3, baseScale[2] * 3]
        : baseScale,
    position: calculatedPosition,
    colors: threeJSColors,
    opacity: active || hovered ? 1.0 : 0.6,
  });

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
  });

  useEffect(() => {}, [active]);

  const handleOnClick = () => {
    setActive(!active);
    handleSelectCard(active, id, name, imageUrl);

    console.log(
      name,
      active,
      colorIdentity,
      "CMC: " + cmc,
      threeJSColors,
      "3D position: " + props.position.payload.map((coord) => `${coord.value}`),
      imageUrl
    );
  };

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => handleOnClick()}
      scale={props.scale}
      position={props.position}
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1]} />
      <a.meshPhysicalMaterial
        attach="material"
        color={props.colors}
        clearcloat={0.5}
        transparent={true}
        opacity={props.opacity}
      />
    </a.mesh>
  );
};

export default Card;
