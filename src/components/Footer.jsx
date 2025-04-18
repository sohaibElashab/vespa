import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

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
    { name: "Facebook", href: "#", icon: <Facebook size={20} /> },
    { name: "Instagram", href: "#", icon: <Instagram size={20} /> },
    { name: "Twitter", href: "#", icon: <Twitter size={20} /> },
    { name: "YouTube", href: "#", icon: <Youtube size={20} /> },
    { name: "Mail", href: "#", icon: <Mail size={20} /> },
  ];

  return (
    <footer className="py-10 md:py-16 bg-[#1B1613]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo or Brand - Optional */}
        <div className="flex justify-center mb-8">
          <div className="text-xl md:text-2xl font-bold text-white">
            Moto <span className="text-orange-900">By Rita</span>
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
          <p className="text-sm text-gray-400">
            © {year} Moto By Rita, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
