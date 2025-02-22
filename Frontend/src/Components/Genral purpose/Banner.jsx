import { Link } from "react-router-dom";
import ProductCard from "../pages/Home/ProductCard";
import { BannerImg } from "../pages/Home/BannerImg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = ({ images, details, height, width }) => {

  const allProducts = useSelector((store) => store.ProductsList.products);

  const [imgIndx, setImgIndx] = useState(0);
  const prevSlide = () => {
    if (BannerImg?.length === 1) {
      return;
    }
    setImgIndx(() => (imgIndx === 0 ? BannerImg?.length - 1 : imgIndx - 1));
  };

  const nextSlide = () => {
    if (BannerImg?.length === 1) {
      return;
    }
    setImgIndx(() => (imgIndx === BannerImg?.length - 1 ? 0 : imgIndx + 1));
  };

  return details === true ? (
    Array(images)
      .fill("")
      .map((e, index) => {
        return (
          <div
            key={index + 11}
            className={`bg-Tan p-5 w-[15vw] h-[32vh] rounded-xl hover:drop-shadow-2xl transition duration-150 ease-in-out`}
          >
            <Link
              to={`/product/${index}`}
              key={index + "BannerImg"}
              className={` flex flex-col    overflow-hidden `}
            >
              <ProductCard index={index} width={width} height={height} />
            </Link>
          </div>
        );
      })
  ) : (
    <div className="relative h-full w-screen overflow-hidden">
      <div
        className="h-full min-w-fit overflow-hidden"
        key={"Banner"}
      >
        <img
          key={+0o0}
          src={BannerImg[imgIndx]}
          alt="Banner"
          className="slide h-full  transition duration-300 rounded-2xl"
        />
      </div>
      <div className="absolute top-[35vh] w-full z-50 flex justify-between items-center     ">
        <button className="bg-gray-500 p-1 mx-4 rounded-full hover:bg-gray-400 transition duration-150 ease-in-out" onClick={prevSlide}>
          <ChevronLeft color="black" />
        </button>
        <button className="bg-gray-500 p-1 mx-4 rounded-full hover:bg-gray-400 transition duration-150 ease-in-out" onClick={nextSlide}>
          <ChevronRight color="black" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
