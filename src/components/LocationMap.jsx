import { useState, useEffect } from "react";
import Title from "./Title";
import { Phone, Mail, Clock, MapPin, Navigation } from "lucide-react";

export default function LocationMap() {
  const [mapLoading, setMapLoading] = useState(true);

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title1="Visit"
          Htitle="Our"
          title2="Location"
          desc="Visit our welcoming location right in the heart of Marrakech"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Map Card */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-[16/9] relative">
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-700"></div>
                  <span className="ml-3 text-gray-600 font-medium">
                    Loading map...
                  </span>
                </div>
              )}
              <iframe
                title="Location Map"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=31.638668,%20-8.006310+(Tropical%20Island%20Resort)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
                onLoad={() => setMapLoading(false)}
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How to Find Us
              </h3>
              <p className="text-gray-600 mb-4">
                We're conveniently located near the heart of Gueliz, Marrakech —
                just a 15-minute drive from the city center and major
                attractions. Look for the vibrant red walls and palm-lined
                entrance!
              </p>
            </div>
          </div>
          {/* Contact Information Card */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Us
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-yellow-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="mt-1 text-gray-600">
                    Marrakech, Morocco
                    <br />
                    Marrakech, Morocco
                    <br />
                    Marrakech, Morocco
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-yellow-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-600">
                    Reservations: (+212) 672 217 210
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-yellow-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-600">motorentbyrita@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-yellow-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Hours</h4>
                  <p className="mt-1 text-gray-600">
                    Monday - Friday: 8:00 AM - 8:00 PM
                    <br />
                    Saturday - Sunday: 9:00 AM - 6:00 PM
                    <br />
                    Holiday hours may vary
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
