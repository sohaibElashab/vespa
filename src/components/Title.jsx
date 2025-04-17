export default function Title({ title1, Htitle, title2, desc }) {
  return (
    <div className="text-center md:mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        <span className="text-[#152037]">{title1}</span>{" "}
        <span className="relative inline-block mx-2">
          <span className="bg-[#B87711] absolute inset-0 transform -skew-y-2 rounded-xl"></span>
          <span className="relative text-white px-4 py-1">{Htitle}</span>
        </span>{" "}
        <span className="text-[#152037]">{title2}</span>
      </h2>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{desc}</p>

      <div className="h-1 w-16 bg-[#B87711] mx-auto mt-8 rounded-full"></div>
    </div>
  );
}
