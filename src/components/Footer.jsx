import { Instagram, Mail } from "lucide-react";
import { useState } from "react";

// TikTok SVG Icon (custom)
const TikTokIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12.6 2c.1 1.1.5 2.1 1.1 3 .8 1.1 2 1.8 3.3 1.9V10c-1.3 0-2.6-.4-3.8-1.1v5.9c0 3.4-2.7 6.2-6 6.2S1.9 18.2 1.9 14.8s2.7-6.2 6-6.2c.2 0 .4 0 .6.1v3c-.2 0-.4-.1-.6-.1-1.7 0-3 1.4-3 3.1s1.4 3.1 3 3.1 3-1.4 3-3.1V2h1.7z" />
  </svg>
);

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  const navigationLinks = [
    { name: "Scooters", href: "motos" },
    { name: "Tours", href: "tours" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Gallery", href: "gallery" },
    { name: "Contact", href: "contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/moto.rent.by.rita/",
      icon: <Instagram size={20} />,
    },
    {
      name: "Mail",
      href: "mailto:motorentbyrita@gmail.com",
      icon: <Mail size={20} />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@moto.rent.by.rita",
      icon: <TikTokIcon size={20} />,
    },
  ];

  return (
    <footer className="py-10 md:py-16 bg-[#1B1613]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-xl md:text-2xl font-bold text-white">
            Moto Rent <span className="text-orange-900">By Rita</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-8 mb-6 md:mb-8">
          {navigationLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm md:text-base text-gray-300 hover:text-yellow-700 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-4 md:gap-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-700 p-2 rounded-full hover:bg-gray-800 transition-all duration-200"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 max-w-3xl mx-auto mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">
            © {year} Moto By Rita, Inc. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Developed by{" "}
            <a
              href="https://sohaibelashab.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-700 hover:underline"
            >
              Sohaib Elashab
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
