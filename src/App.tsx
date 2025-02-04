import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import EggModel from "./components/EggModel";
import BabyModel from "./components/BabyModel";
import EggPhase from "./components/EggPhase";
import BabyPhase from "./components/BabyPhase";

function App() {
  const [phase, setPhase] = useState("egg");

  const handleEggComplete = () => {
    setPhase("baby");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls enableZoom={false} />
          {phase === "egg" && <EggModel />}
          {phase === "baby" && <BabyModel />}
        </Canvas>
      </div>

      <div className="p-4 bg-gray-100">
        {phase === "egg" && <EggPhase onPhaseComplete={handleEggComplete} />}
        {phase === "baby" && <BabyPhase />}
      </div>
    </div>
  );
}

export default App;
