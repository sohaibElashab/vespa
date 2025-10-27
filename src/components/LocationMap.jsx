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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4166.4361178626!2d-8.006642855124893!3d31.638240829432615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafef0031bb7519%3A0xc4022a02e695feee!2sMOTO%20RENT%20BY%20RITA!5e1!3m2!1sfr!2sma!4v1761580559683!5m2!1sfr!2sma"
                title="Location Map"
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
                    RES AMINA MAG 30 RDC K. B OUALID,
                    <br />
                    40000 Marrakech,
                    <br />
                    Morocco
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-yellow-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-600">
                    Reservations: (+212) 666 478 077
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
