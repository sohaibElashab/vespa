import { useState } from "react";
import Title from "./Title";
import { scooters } from "../utils/scooter";

export default function ScooterDisplay() {
  const [scooterState, setScooterState] = useState(scooters);
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div id="motos" className="max-w-6xl mx-auto px-4 py-12">
      <Title
        title1="Explore"
        Htitle="Our"
        title2="Models"
        desc="Find the model that matches your style and performance needs"
      />

      <div className="">
        <div className="flex flex-col items-center">
          <div className="h-96 w-full mb-6 flex items-center justify-center">
            <img
              src={scooterState[activeColor].image}
              alt={scooterState[activeColor].name}
              className="max-h-full object-contain"
            />
          </div>

          <div className="flex gap-2 mb-4">
            {scooterState.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full ${color.code} ${
                  activeColor === index
                    ? "ring-2 ring-gray-800"
                    : "ring-2 ring-gray-200"
                }`}
                onClick={() => setActiveColor(index)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>

          <h3 className="text-lg font-bold text-center text-gray-800 mb-1">
            {scooterState[activeColor].name}
          </h3>

          <p className="text-md font-medium text-center text-gray-500">
            {scooterState[activeColor].price}
          </p>
        </div>
      </div>
    </div>
  );
}
