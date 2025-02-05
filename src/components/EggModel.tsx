import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function EggModel() {
  const mesh = useRef();
  const model = useGLTF("/egg.glb");
  console.log(model);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={mesh} scale={0.7}>
      <primitive object={model.scene} />;
    </mesh>
  );
}

export default EggModel;
