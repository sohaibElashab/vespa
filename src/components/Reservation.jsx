import { useEffect, useState } from "react";
import {
  Calendar,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  MessageSquare,
  Bike,
  Navigation,
  Info,
  Plus,
  Minus,
  Check,
  X,
  PenTool,
} from "lucide-react";
import Title from "./Title";
import { scooters } from "../utils/scooter";
import { tours } from "../utils/tours";

export default function Reservation({reservationTour}) {
  const [reservationType, setReservationType] = useState("rental");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [expandedTour, setExpandedTour] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vehicleQuantities, setVehicleQuantities] = useState({});
  const [dateError, setDateError] = useState("");
  const [showCustomTour, setShowCustomTour] = useState(false);
  const [customTour, setCustomTour] = useState({
    title: "",
    place: "",
    participants: 1,
    duration: "",
    scooters: {},
  });

  useEffect(() => {
    if (reservationTour) {
      setReservationType("tour");
      handleTourSelection(reservationTour.id);
    }
  }, [reservationTour]);

  const handleVehicleSelection = (vehicleId) => {
    if (!vehicleQuantities[vehicleId]) {
      setVehicleQuantities({ ...vehicleQuantities, [vehicleId]: 1 });
    }
    setSelectedVehicle(vehicleId);
  };

  const increaseQuantity = (vehicleId) => {
    setVehicleQuantities({
      ...vehicleQuantities,
      [vehicleId]: (vehicleQuantities[vehicleId] || 0) + 1,
    });
  };

  const decreaseQuantity = (vehicleId) => {
    if (vehicleQuantities[vehicleId] > 1) {
      setVehicleQuantities({
        ...vehicleQuantities,
        [vehicleId]: vehicleQuantities[vehicleId] - 1,
      });
    } else {
      // Remove the scooter if quantity goes to 0
      const newQuantities = { ...vehicleQuantities };
      delete newQuantities[vehicleId];
      setVehicleQuantities(newQuantities);

      // If this was the selected scooter, clear the selection
      if (selectedVehicle === vehicleId) {
        setSelectedVehicle(null);
      }
    }
  };

  const toggleTourDetails = (tourId) => {
    setExpandedTour(expandedTour === tourId ? null : tourId);
  };

  const handleTourSelection = (tourId) => {
    setSelectedTour(selectedTour === tourId ? null : tourId);
  };

  const validateDates = (start, end) => {
    if (!start || !end) return;

    const startDt = new Date(start);
    const endDt = new Date(end);

    // Current date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDt < today) {
      setDateError("Start date cannot be in the past");
      return false;
    }

    if (endDt < startDt) {
      setDateError("End date cannot be before start date");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleStartDateChange = (e) => {
    const newDate = e.target.value;
    setStartDate(newDate);
    validateDates(newDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newDate = e.target.value;
    setEndDate(newDate);
    validateDates(startDate, newDate);
  };

  const toggleCustomTour = () => {
    setShowCustomTour(!showCustomTour);
    if (!showCustomTour) {
      setSelectedTour(null);
    }
  };

  const updateCustomTour = (field, value) => {
    setCustomTour({
      ...customTour,
      [field]: value,
    });
  };

  const handleCustomVehicleChange = (vehicleId, quantity) => {
    if (quantity <= 0) {
      const newVehicles = { ...customTour.scooters };
      delete newVehicles[vehicleId];
      updateCustomTour("scooters", newVehicles);
    } else {
      updateCustomTour("scooters", {
        ...customTour.scooters,
        [vehicleId]: quantity,
      });
    }
  };

  // Generate participants options based on selected tour
  const getParticipantsOptions = () => {
    if (!selectedTour) return null;

    const selectedTourDetails = tours.find((tour) => tour.id === selectedTour);
    if (!selectedTourDetails) return null;

    const maxPeople = selectedTourDetails.maxPeople;
    return Array.from({ length: maxPeople }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num} {num === 1 ? "person" : "people"}
      </option>
    ));
  };

  return (
    <section id="reservation" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title1="Quick"
          Htitle="Booking"
          title2="Process"
          desc="Book your perfect scooter or tour experience in just a few clicks"
        />

        {/* Reservation Type Selection */}
        <div className="mb-10">
          <div className="bg-white rounded-lg shadow-md p-5 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`flex-1 py-4 px-6 rounded-lg flex items-center justify-center gap-3 ${
                  reservationType === "rental"
                    ? "bg-yellow-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setReservationType("rental")}
              >
                <Bike className="w-5 h-5" />
                <span className="font-medium">Scooter Rental</span>
              </button>
              <button
                className={`flex-1 py-4 px-6 rounded-lg flex items-center justify-center gap-3 ${
                  reservationType === "tour"
                    ? "bg-yellow-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setReservationType("tour")}
              >
                <Navigation className="w-5 h-5" />
                <span className="font-medium">Guided Tour</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <div className="flex">
                  <select className="px-3 py-2 border border-gray-300 rounded-l-lg border-r-0 bg-gray-50 text-gray-700">
                    <option>+212</option>
                    <option>+44</option>
                    <option>+1</option>
                    <option>+49</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Scooter or Tour Selection */}
            {reservationType === "rental" ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Bike className="w-5 h-5 mr-2 text-yellow-700" />
                  Select Scooter(s)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {scooters.map((scooter) => (
                    <div
                      key={scooter.id}
                      onClick={() => handleVehicleSelection(scooter.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        vehicleQuantities[scooter.id]
                          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-300"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <div className=" flex items-center justify-center">
                            <img
                              src={scooter.image}
                              alt={scooter.name}
                              className=" h-16 object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {scooter.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {scooter.type}
                            </p>
                            <p className="text-sm font-semibold text-yellow-700 mt-1">
                              {scooter.price}
                            </p>
                          </div>
                        </div>

                        {vehicleQuantities[scooter.id] && (
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity(scooter.id);
                              }}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="text-lg font-medium w-6 text-center">
                              {vehicleQuantities[scooter.id]}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity(scooter.id);
                              }}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        )}
                      </div>

                      {vehicleQuantities[scooter.id] && (
                        <div className="mt-2 flex items-center text-sm text-green-600">
                          <Check className="w-4 h-4 mr-1" />
                          <span>Added to your reservation</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {Object.keys(vehicleQuantities).length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Selected Scooters:
                    </h4>
                    <ul className="space-y-2">
                      {Object.entries(vehicleQuantities).map(
                        ([id, quantity]) => {
                          const scooter = scooters.find(
                            (v) => v.id === parseInt(id)
                          );
                          return (
                            <li key={id} className="flex justify-between">
                              <span>{scooter.name}</span>
                              <span className="font-medium">
                                {quantity} × {scooter.price}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="md:text-lg font-semibold text-gray-900 flex items-center">
                    <Navigation className="w-5 h-5 mr-2 text-yellow-700" />
                    Select Tour
                  </h3>
                  <button
                    type="button"
                    onClick={toggleCustomTour}
                    className={`md:px-4 px-2 py-2 rounded-lg text-sm transition-colors flex items-center ${
                      showCustomTour
                        ? "bg-yellow-700 text-white"
                        : "border border-yellow-700 text-yellow-700 hover:bg-yellow-50"
                    }`}
                  >
                    <PenTool className="w-4 h-4 mr-2" />
                    {showCustomTour
                      ? "Cancel Custom Tour"
                      : "Create Custom Tour"}
                  </button>
                </div>

                {showCustomTour ? (
                  <div className="border rounded-lg p-6 bg-orange-50 mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Custom Tour Creation
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tour Title *
                        </label>
                        <input
                          type="text"
                          value={customTour.title}
                          onChange={(e) =>
                            updateCustomTour("title", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Give your tour a name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin className="w-4 h-4 inline mr-1 text-yellow-700" />
                          Location/Place *
                        </label>
                        <input
                          type="text"
                          value={customTour.place}
                          onChange={(e) =>
                            updateCustomTour("place", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Where would you like to go?"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Users className="w-4 h-4 inline mr-1 text-yellow-700" />
                          Number of Participants *
                        </label>
                        <input
                          type="number"
                          value={customTour.participants}
                          onChange={(e) =>
                            updateCustomTour(
                              "participants",
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Clock className="w-4 h-4 inline mr-1 text-yellow-700" />
                          Desired Duration *
                        </label>
                        <input
                          type="text"
                          value={customTour.duration}
                          onChange={(e) =>
                            updateCustomTour("duration", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="e.g. 2 hours, Half day, etc."
                          required
                        />
                      </div>
                    </div>

                    <h5 className="font-medium text-gray-900 mb-2">
                      Select Scooters for Your Tour
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {scooters.map((scooter) => (
                        <div
                          key={scooter.id}
                          className="flex items-center justify-between border rounded-lg p-3 bg-white"
                        >
                          <div className="flex items-center">
                            <img
                              src={scooter.image}
                              alt={scooter.name}
                              className=" h-16 object-cover"
                            />
                            <div>
                              <h6 className="font-medium">{scooter.name}</h6>
                              <p className="text-sm text-yellow-700">
                                {scooter.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleCustomVehicleChange(
                                  scooter.id,
                                  (customTour.scooters[scooter.id] || 0) - 1
                                )
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="text-lg font-medium w-6 text-center">
                              {customTour.scooters[scooter.id] || 0}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCustomVehicleChange(
                                  scooter.id,
                                  (customTour.scooters[scooter.id] || 0) + 1
                                )
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {tours.map((tour) => (
                      <div
                        key={tour.id}
                        className={`border rounded-lg overflow-hidden transition ${
                          selectedTour === tour.id
                            ? "border-orange-500 bg-orange-50 ring-2 ring-orange-300"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-2/3">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-bold text-gray-900">
                                {tour.title}
                              </h4>
                              <div className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{tour.rating}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-gray-600 my-3">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-yellow-700" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-yellow-700" />
                                <span>Max: {tour.maxPeople} people</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold text-yellow-700">
                                  ${tour.price}
                                </span>
                                <span className="text-sm">/person</span>
                              </div>
                            </div>

                            {expandedTour === tour.id ? (
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">
                                  Highlights:
                                </h5>
                                <ul className="space-y-1">
                                  {tour.highlights.map((highlight, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start text-gray-700"
                                    >
                                      <svg
                                        className="h-4 w-4 text-yellow-700 mr-2 mt-1 flex-shrink-0"
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
                              <p className="text-gray-600 mb-4">
                                {tour.highlights[0]} and{" "}
                                {tour.highlights.length - 1} more highlights...
                              </p>
                            )}

                            <div className="flex md:items-center flex-col md:flex-row md:space-y-0 md:space-x-3 space-y-3">
                              <button
                                type="button"
                                onClick={() => toggleTourDetails(tour.id)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-100 transition-colors flex items-center"
                              >
                                <Info className="w-4 h-4 mr-1" />
                                {expandedTour === tour.id
                                  ? "Less details"
                                  : "More details"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleTourSelection(tour.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center ${
                                  selectedTour === tour.id
                                    ? "bg-yellow-700 text-white"
                                    : "border border-yellow-700 text-yellow-700 hover:bg-yellow-50"
                                }`}
                              >
                                {selectedTour === tour.id ? (
                                  <>
                                    <Check className="w-4 h-4 mr-1" />
                                    Selected
                                  </>
                                ) : (
                                  "Select Tour"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-1 text-yellow-700" />
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {reservationType === "rental" && (
                <div>
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <CalendarDays className="w-4 h-4 mr-1 text-yellow-700" />
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              )}

              {dateError && (
                <div className="col-span-2">
                  <p className="text-red-500 text-sm">{dateError}</p>
                </div>
              )}

              {reservationType === "tour" && (
                <div>
                  <label
                    htmlFor="time"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-1 text-yellow-700" />
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              )}

              {reservationType === "tour" && !showCustomTour && (
                <div>
                  <label
                    htmlFor="participants"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <Users className="w-4 h-4 mr-1 text-yellow-700" />
                    Number of Participants *
                  </label>
                  <select
                    id="participants"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    disabled={!selectedTour}
                  >
                    {!selectedTour ? (
                      <option value="">Select a tour first</option>
                    ) : (
                      getParticipantsOptions()
                    )}
                  </select>

                  {selectedTour && (
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum{" "}
                      {tours.find((t) => t.id === selectedTour)?.maxPeople || 0}{" "}
                      people per tour
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div>
              <label
                htmlFor="comments"
                className="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-1 text-yellow-700" />
                Special Requests or Comments
              </label>
              <textarea
                id="comments"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Let us know if you have any special requests or questions..."
              ></textarea>
            </div>

            {/* Order Summary */}
            {((reservationType === "rental" &&
              Object.keys(vehicleQuantities).length > 0) ||
              (reservationType === "tour" && selectedTour) ||
              (reservationType === "tour" &&
                showCustomTour &&
                customTour.title &&
                customTour.place &&
                customTour.duration)) && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Reservation Summary
                </h3>

                {/* Rental summary */}
                {reservationType === "rental" &&
                  Object.keys(vehicleQuantities).length > 0 && (
                    <>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Scooter Rental:</span>
                        <span>
                          {startDate && endDate
                            ? `${startDate} to ${endDate}`
                            : "Dates not selected"}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {Object.entries(vehicleQuantities).map(
                          ([id, quantity]) => {
                            const scooter = scooters.find(
                              (v) => v.id === parseInt(id)
                            );
                            return (
                              <li
                                key={id}
                                className="flex justify-between text-sm"
                              >
                                <span>{scooter.name}</span>
                                <span className="font-medium">
                                  {quantity} × {scooter.price}
                                </span>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </>
                  )}

                {/* Tour summary */}
                {reservationType === "tour" && selectedTour && (
                  <>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Selected Tour:</span>
                        <span>
                          {tours.find((t) => t.id === selectedTour)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Date:</span>
                        <span>{startDate || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Price:</span>
                        <span>
                          ${tours.find((t) => t.id === selectedTour)?.price}
                          /person
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Custom tour summary */}
                {reservationType === "tour" &&
                  showCustomTour &&
                  customTour.title &&
                  customTour.place &&
                  customTour.duration && (
                    <>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Custom Tour:</span>
                          <span>{customTour.title}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Location:</span>
                          <span>{customTour.place}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Duration:</span>
                          <span>{customTour.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Participants:</span>
                          <span>
                            {customTour.participants}{" "}
                            {customTour.participants === 1
                              ? "person"
                              : "people"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Date:</span>
                          <span>{startDate || "Not selected"}</span>
                        </div>
                      </div>

                      {Object.keys(customTour.scooters).length > 0 && (
                        <>
                          <div className="text-sm font-medium mb-2">
                            Selected Scooters:
                          </div>
                          <ul className="space-y-1 mb-3">
                            {Object.entries(customTour.scooters).map(
                              ([id, quantity]) => {
                                if (quantity <= 0) return null;
                                const scooter = scooters.find(
                                  (v) => v.id === parseInt(id)
                                );
                                return (
                                  <li
                                    key={id}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>{scooter.name}</span>
                                    <span>
                                      {quantity}{" "}
                                      {quantity === 1 ? "scooter" : "scooters"}
                                    </span>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </>
                      )}
                    </>
                  )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>To be calculated based on your selections</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Final price will be confirmed before payment
                  </p>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-700 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-yellow-700 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-yellow-700 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                {reservationType === "rental"
                  ? "Book Rental"
                  : showCustomTour
                  ? "Book Custom Tour"
                  : "Book Tour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
