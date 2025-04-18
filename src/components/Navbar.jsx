import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, ChevronDown, MapPin, Calendar } from "lucide-react";

const navigation = [
  { name: "Scooters", href: "motos" },
  { name: "Tours", href: "tours" },
  { name: "Testimonials", href: "testimonials" },
  { name: "Gallery", href: "gallery" },
  { name: "Contact", href: "contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleSubmenu = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 md:backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="hero" smooth={true} className="cursor-pointer">
            <div className="flex items-center">
              {/* Moroccan-style icon/logo placeholder */}
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center mr-3">
                <img src="logo.webp" alt="logo" />
              </div>
              <div>
                <span
                  className={`text-2xl font-bold tracking-tight text-[#1B1613]`}
                >
                  Moto By <span className="text-orange-900">Rita</span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item, index) => (
            <div key={item.name} className="relative">
              <div className="flex items-center">
                <Link
                  to={item.href}
                  smooth={true}
                  className={`text-sm font-medium cursor-pointer transition-colors ${
                    scrolled
                      ? "text-gray-700 hover:text-orange-900"
                      : "text-[#1B1613] hover:text-yellow-700"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6">
          <Link
            to="reservation"
            smooth={true}
            className={`bg-yellow-700 text-white px-5 py-2 rounded-full font-medium hover:bg-yellow-950 transition-colors cursor-pointer flex items-center ${
              scrolled ? "shadow-md" : ""
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`rounded-md p-2 transition-colors ${
              scrolled
                ? "text-gray-700 hover:text-orange-900"
                : "text-[#1B1613] hover:text-orange-900"
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link
              to="hero"
              smooth={true}
              className="cursor-pointer"
              onClick={closeAll}
            >
              <span className="text-xl font-bold text-[#1B1613]">
                Moto By <span className="text-orange-900">Rita</span>
              </span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:text-orange-900 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile menu content with Moroccan-inspired styling */}
          <div className="px-6 py-6 space-y-6 overflow-y-auto max-h-screen pb-32">
            {navigation.map((item, index) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Link
                    to={item.href}
                    smooth={true}
                    onClick={closeAll}
                    className="text-base font-medium text-gray-900 hover:text-orange-900 cursor-pointer transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              </div>
            ))}

            {/* Moroccan-inspired decorative element */}
            <div className="flex justify-center py-6">
              <div className="w-2/3 h-1 bg-gradient-to-r from-orange-900 via-orange-200 to-orange-900 rounded-full"></div>
            </div>

            <Link
              to="reservation"
              smooth={true}
              className="block w-full bg-yellow-700 text-white text-center py-3 rounded-full font-medium hover:bg-yellow-950 transition-colors cursor-pointer mt-8 shadow-md"
              onClick={closeAll}
            >
              Book Your Adventure
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
