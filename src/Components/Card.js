import React, { useState, useRef } from "react";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "react-three-fiber";

import "./Card.css";

const normalizeColors = (prevColors) => {
  let normalizedColors = [];
  if (prevColors.length === 0) {
    normalizedColors.push("silver");
  } else {
    prevColors.map((color) => {
      normalizedColors.push(color.toLowerCase());
    });
  }
  return normalizedColors;
};

const Card = ({ coords, colors, cmc }) => {
  const meshRef = useRef();
  const baseScale = [1, 1, 1];
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  // const [isColorless, setColorless] = useState(false);

  const props = useSpring({
    scale:
      active || hovered
        ? [baseScale[0] * 2, baseScale[1] * 2, baseScale[2] * 2]
        : baseScale,
    position: [coords[0], cmc * 10 + 1, coords[2]],
    colors: normalizeColors(colors),
  });

  console.log(normalizeColors(colors), coords[0], cmc * 10 + 1, coords[2]);

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      position={props.position}
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1]} />
      <a.meshPhysicalMaterial attach="material" color={props.colors} />
    </a.mesh>
  );
};

export default Card;
