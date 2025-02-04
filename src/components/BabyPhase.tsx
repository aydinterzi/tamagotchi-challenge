import { useState, useEffect } from "react";
import DropZone from "./DropZone";
import DraggableItem from "./DraggableItem";

function BabyPhase() {
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);

  const [foodTokens, setFoodTokens] = useState(3);
  const [toyTokens, setToyTokens] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(0, prev - 1));
      setHappiness((prev) => Math.max(0, prev - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBabyDrop = (droppedType) => {
    if (droppedType === "food" && foodTokens > 0) {
      setHunger((prev) => Math.min(100, prev + 10));
      setFoodTokens((prev) => prev - 1);
    }
    if (droppedType === "toy" && toyTokens > 0) {
      setHappiness((prev) => Math.min(100, prev + 10));
      setToyTokens((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-bold">Bebek Aşaması</div>

      <div className="flex space-x-4">
        {foodTokens > 0 && (
          <DraggableItem
            type="food"
            label={`Yemek (${foodTokens})`}
            id="food-token"
          />
        )}
        {toyTokens > 0 && (
          <DraggableItem
            type="toy"
            label={`Oyuncak (${toyTokens})`}
            id="toy-token"
          />
        )}
      </div>

      <DropZone onDrop={handleBabyDrop} label="Bebek Üzerine Sürükle" />

      <div className="w-full max-w-md">
        <div className="mb-1 text-sm font-medium text-gray-700">Açlık</div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${hunger}%` }}
          ></div>
        </div>
      </div>
      <div className="w-full max-w-md">
        <div className="mb-1 text-sm font-medium text-gray-700">Mutluluk</div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${happiness}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-4">
        <p>Not: Yemek ve oyuncak ile bebeği besle/oynat!</p>
      </div>
    </div>
  );
}

export default BabyPhase;
