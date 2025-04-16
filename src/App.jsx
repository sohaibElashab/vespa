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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Motos />
      <Tours/>
      <Reservation />
      <Testimonials />
      <Gallery />
      <LocationMap />
      <Footer />
    </div>
  );
}

export default App;
