import { useState, useEffect, useRef } from "react";
import Title from "./Title";
import { scooters } from "../utils/scooter";

export default function ScooterDisplay() {
  const [scooterState, setScooterState] = useState(scooters);
  const [activeColor, setActiveColor] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageContainerRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto slider effect with hover pause
  useEffect(() => {
    // Start the interval only if not hovering
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        changeScooter((activeColor + 1) % scooterState.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [scooterState.length, isHovering, activeColor]);

  // Function to change scooter with animation
  const changeScooter = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveColor(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 100);
  };

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    setZoomPosition({ x, y });
  };

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
          <div
            ref={imageContainerRef}
            className="h-96 w-full mb-6 flex items-center justify-center relative overflow-hidden cursor-zoom-in"
            onMouseEnter={() => {
              setIsZoomed(true);
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsZoomed(false);
              setIsHovering(false);
            }}
            onMouseMove={handleMouseMove}
          >
            <div
              className={`w-full h-full transition-transform duration-200 flex items-center justify-center ${
                isZoomed ? "scale-150" : ""
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            >
              <img
                src={scooterState[activeColor].image}
                alt={scooterState[activeColor].name}
                className={`max-h-full object-contain transition-opacity duration-600 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
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
                onClick={() => changeScooter(index)}
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
