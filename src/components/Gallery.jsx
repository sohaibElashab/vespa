import Title from "./Title";

const images = [
  {
    id: 1,
    url: "gallery7.webp",
    alt: "Scenic coastal road",
  },
  {
    id: 2,
    url: "gallery8.webp",
    alt: "Sunset view",
  },
  {
    id: 3,
    url: "gallery9.webp",
    alt: "Cultural site",
  },
  {
    id: 4,
    url: "gallery10.webp",
    alt: "ATV adventure",
  },
  {
    id: 5,
    url: "gallery11.webp",
    alt: "Beach exploration",
  },
  {
    id: 6,
    url: "gallery12.webp",
    alt: "Mountain biking",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title1="Adventure"
          Htitle="Moments"
          title2="Captured"
          desc="Captured moments from unforgettable journeys and scenic tours"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
