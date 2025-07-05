import ClientLink from "../Common/ClientClick";
import CustomSwiper from "../Custom/CustomSwiper";

const Slider = ({ data }) => (
  <CustomSwiper
    data={data}
    renderContent={(slide) => (
      <ClientLink
        href={`/${slide.slug}`}
        className="block w-full h-full"
      >
        <img
          src={slide.slider_image}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-4">
          <h2 className="text-xl md:text-3xl font-semibold text-tprimary">{slide.title}</h2>
        </div>
      </ClientLink>
    )}
  />
);

export default Slider