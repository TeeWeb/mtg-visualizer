import React, { useRef } from "react";
import { useThree, useFrame, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
  const { camera, gl } = useThree();
  const orbitRef = useRef();
  camera.position.set(0, 100, 125);
  camera.aspect = window.innerWidth / window.innerHeight;

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={orbitRef}
      // maxPolarAngle={Math.PI / 2.01}
      enableKeys={true}
      enablePanning={true}
      keys={{ LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83 }}
    />
  );
};

export default Controls;
