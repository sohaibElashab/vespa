import { useState } from "react";
import { Calendar, Map, Clock, Users } from "lucide-react";
import Title from "./Title";
import { tours } from "../utils/tours";

export default function Tours({ onBook }) {
  const [selectedTour, setSelectedTour] = useState(null);

  const handleViewDetails = (tourId) => {
    setSelectedTour(selectedTour === tourId ? null : tourId);
  };

  return (
    <section id="tours" className="py-24 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title1="Discover"
          Htitle="guided"
          title2="tours"
          desc="Journey through stunning landscapes and rich culture with expert local guides by your side"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => {
            const isExpanded = selectedTour === tour.id;

            return (
              <div
                key={tour.id}
                className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isExpanded ? "ring-2 ring-yellow-500" : "hover:shadow-xl"
                } ${tour.featured ? "lg:col-span-2 md:col-span-2" : ""}`}
              >
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className={`w-full object-cover ${
                      tour.featured ? "h-72" : "h-60"
                    }`}
                  />
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-700 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Featured Tour
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{tour.rating}/5.0</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {tour.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-700" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-yellow-700" />
                      <span>Max: {tour.maxPeople} people</span>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Tour Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {tour.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-700"
                          >
                            <svg
                              className="h-5 w-5 text-yellow-700 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-gray-600">
                        {tour.highlights.slice(0, 2).join(" • ")} and more...
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="md:text-3xl text-xl font-bold text-yellow-700">
                        ${tour.price}
                      </span>
                      <span className="text-gray-600 text-sm">/person</span>
                    </div>

                    <div className="space-x-2 flex">
                      <button
                        onClick={() => handleViewDetails(tour.id)}
                        className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {isExpanded ? "Less Info" : "More Info"}
                      </button>
                      <button
                        onClick={() => onBook(tour)}
                        className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Looking for something different? We also offer custom private tours
            tailored to your interests.
          </p>
          <button className="inline-flex items-center px-6 py-3 border-2 border-yellow-700 text-yellow-700 hover:text-white hover:border-white hover:bg-yellow-700 font-medium rounded-lg transition-colors">
            <Calendar className="h-5 w-5 mr-2" />
            Request Custom Tour
          </button>
        </div>
      </div>
    </section>
  );
}
