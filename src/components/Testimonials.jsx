import Title from "./Title";

const testimonials = [
  {
    id: 1,
    name: "Laura Bennett",
    location: "UK",
    rating: 5,
    text: "Absolutely loved it! Riding a Vespa through Marrakech was unforgettable. The team was so friendly and made everything super easy. Highly recommend for anyone visiting the city!",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100",
  },
  {
    id: 2,
    name: "Adam Fischer",
    location: "Germany",
    rating: 5,
    text: "Fantastic experience! The scooters were new and well maintained, and exploring the medina and Palmeraie on a Vespa felt like pure freedom. Great service and fair prices!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  },
  {
    id: 3,
    name: "Sofia Martins",
    location: "Portugal",
    rating: 5,
    text: "The best way to discover Marrakech! We booked a couple’s tour to the Agafay Desert and it was magical — sunset views, mint tea, and amazing guides. Thank you for the memories!",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100",
  },
];


function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title1="Customer"
          Htitle="Reviews"
          title2="Shared"
          desc="Discover real stories and reviews from our satisfied customers"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <div className="mt-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="mt-4 text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
