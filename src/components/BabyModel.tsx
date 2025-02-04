import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function BabyModel({ isHungry, isUnhappy }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  const baseColor = "orange";
  const alertColor = "gray";
  const color = isHungry || isUnhappy ? alertColor : baseColor;

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default BabyModel;
