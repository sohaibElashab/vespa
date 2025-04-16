import { Link } from "react-scroll";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen bg-white flex items-center overflow-hidden">
      {/* Main content */}
      <img
        src="/hero.webp"
        alt="Vespa Scooter"
        className="xl:w-[60%] md:w-[70%] hidden md:block w-full h-auto object-contain md:object-right max-h-96 md:max-h-screen absolute right-0 top-1/2 -translate-y-1/2"
      />
      <div className="container mx-auto px-4 xl:px-12 flex flex-col md:flex-row items-center">
        {/* Left content - Text */}
        <div
          className={`w-full z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight mb-6">
            Ride into the
            <span className="relative inline-block mx-2">
              <span className="bg-yellow-700 text-[#1B1613] absolute inset-0 transform -skew-y-2 rounded-xl"></span>
              <span className="relative text-orange-100">Adventure</span>
            </span>
            with
            <br />
            Marrakech Vespa rentals
          </h1>

          <p className="hidden md:block text-lg text-gray-600 max-w-lg mb-8 pr-20">
            Experience the iconic design and unmatched performance of the latest
            Vespa models. Explore our promotions and find your perfect ride
            today.
          </p>
          <p className="md:hidden block text-lg text-gray-600 max-w-lg mb-8">
            Your next adventure awaits.
          </p>

          <Link
            to="motos"
            smooth={true}
            className="bg-yellow-700 cursor-pointer text-white px-8 py-4 rounded-full hover:bg-yellow-950 transition transform hover:scale-105 font-medium text-lg"
          >
            Discover Now
          </Link>
        </div>

        {/* Right content - Scooter Image */}
        <div
          className={`hidden md:block w-full md:w-1/2 mt-12 md:mt-0 transition-all duration-1500 ease-out ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
          }`}
        >
          <div className="relative h-full flex items-center justify-center md:justify-end">
            {/* Decorative circles */}
            <div className="absolute right-[30%] top-[30px] w-28 h-28 rounded-full bg-blue-950 animate-pulse"></div>
            <div className="absolute left-[-70px] bottom-[-180px] w-32 h-32 rounded-full bg-green-200 animate-pulse"></div>
            <div className="absolute left-[50px] w-16 h-16 rounded-full bg-black animate-pulse"></div>
          </div>
        </div>
        <img
          src="/hero-mobile.webp"
          alt="Vespa Scooter"
          className="xl:w-[60%] md:w-[70%] md:hidden block w-full h-auto object-contain max-h-96"
        />
      </div>
    </section>
  );
}
