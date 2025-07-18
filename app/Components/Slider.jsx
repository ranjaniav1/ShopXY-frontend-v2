import ClientLink from "../Common/ClientClick";
import CustomSwiper from "../Custom/CustomSwiper";

const Slider = ({ data }) => (
  <CustomSwiper className="rounded-xl overflow-hidden shadow-lg"
    data={data}
    renderContent={(slide) => (
      <ClientLink
        href={`/category/${slide.slug}`}
        className="block w-full h-full"
      >
        <img
          src={slide.slider_image}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center text-center p-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">{slide.title}</h2>
        </div>
      </ClientLink>
    )}
  />
);

export default Slider