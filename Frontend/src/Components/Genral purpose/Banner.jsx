import { Link } from "react-router-dom";
import ProductCard from "../pages/Home/ProductCard";
import { BannerImg } from "../pages/Home/BannerImg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = ({ images, start, details, height, width }) => {
  // const FilteredItem = useSelector((store) => store.FilteredData.items);
  // console.log(height);

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
            className={`bg-Tan p-5 w-[15vw] h-[32vh] rounded-xl hover:drop-shadow-2xl transition duration-150 ease-in-out`}
          >
            <Link
              to={`/product/${index + start}`}
              key={index + "BannerImg"}
              className={` flex flex-col    overflow-hidden `}
            >
              <ProductCard
                key={index + 11}
                index={index}
                start={start}
                width={width}
                height={height}
              />
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
        <button onClick={prevSlide}>
          <ChevronLeft color="black" />
        </button>
        <button onClick={nextSlide}>
          <ChevronRight color="black" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
