import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Motos from "./components/Motos";
import Tours from "./components/Tours";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import LocationMap from "./components/LocationMap";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

function App() {
  const [reservation, setReservation] = useState(null);

  const handleReservation = (data) => {
    setReservation(data);
    const reservationElement = document.getElementById("reservation");
    if (reservationElement) {
      setTimeout(() => {
        reservationElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Motos />
      <Tours onBook={handleReservation} />
      <Reservation reservationTour={reservation} />
      <Testimonials />
      <Gallery />
      <LocationMap />
      <Footer />
    </div>
  );
}

export default App;
