import Categoy from "./Components/Categoy";
import Collection from "./Components/Collection";
import HomeProduct from "./Components/HomeProduct";
import SaleAndDiscount from "./Components/SaleAndDiscount";
import Slider from "./Components/Slider";
export default function Home() {
  return (
    <>
      <Categoy />
      <Slider />
      <Collection />
      <SaleAndDiscount />
      <HomeProduct />
    </>
  );
}
