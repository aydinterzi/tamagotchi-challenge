import { useState, useEffect } from "react";
import DropZone from "./DropZone";
import DraggableItem from "./DraggableItem";

function EggPhase({ onPhaseComplete }) {
  const [eggTimer, setEggTimer] = useState(20);
  const [eggTemperature, setEggTemperature] = useState(80);
  const [eggHumidity, setEggHumidity] = useState(80);
  const eggThreshold = 50;

  const [heatTokens, setHeatTokens] = useState(3);
  const [waterTokens, setWaterTokens] = useState(3);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setEggTimer((prev) => {
        if (prev <= 1) {
          if (eggTemperature >= eggThreshold && eggHumidity >= eggThreshold) {
            onPhaseComplete();
            return 0;
          } else {
            return 20;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [eggTemperature, eggHumidity, onPhaseComplete]);

  useEffect(() => {
    const degradeInterval = setInterval(() => {
      setEggTemperature((prev) => Math.max(0, prev - 1));
      setEggHumidity((prev) => Math.max(0, prev - 1));
    }, 5000);
    return () => clearInterval(degradeInterval);
  }, []);

  const handleEggDrop = (droppedType) => {
    if (droppedType === "heat" && heatTokens > 0) {
      setEggTemperature((prev) => Math.min(100, prev + 10));
      setHeatTokens((prev) => prev - 1);
    }
    if (droppedType === "water" && waterTokens > 0) {
      setEggHumidity((prev) => Math.min(100, prev + 10));
      setWaterTokens((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-bold">Yumurta Aşaması</div>
      <div>Süre: {eggTimer} saniye</div>

      <div className="flex space-x-4">
        {heatTokens > 0 && (
          <DraggableItem
            type="heat"
            label={`Isı (${heatTokens})`}
            id="heat-token"
          />
        )}
        {waterTokens > 0 && (
          <DraggableItem
            type="water"
            label={`Su (${waterTokens})`}
            id="water-token"
          />
        )}
      </div>

      <DropZone onDrop={handleEggDrop} label="Yumurtaya Sürükle" />

      <div className="w-full max-w-md">
        <div className="mb-1 text-sm font-medium text-gray-700">Sıcaklık</div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${eggTemperature}%` }}
          ></div>
        </div>
      </div>
      <div className="w-full max-w-md">
        <div className="mb-1 text-sm font-medium text-gray-700">Nem</div>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${eggHumidity}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-4">
        <p>Not: Sıcaklık ve Nem en az {eggThreshold} olmalı.</p>
      </div>
    </div>
  );
}

export default EggPhase;
