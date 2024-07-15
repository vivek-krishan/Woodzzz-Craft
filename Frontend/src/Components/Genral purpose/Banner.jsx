import { Link } from "react-router-dom";
import Data from "../Utils/Data.json";
import ProductCard from "../pages/Home/ProductCard";
import { BannerImg } from "../pages/Home/BannerImg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = ({ images, start, details }) => {
  // const FilteredItem = useSelector((store) => store.FilteredData.items);
  // console.log(FilteredItem);

  const [imgIndx, setImgIndx] = useState(0);
  
  const items =
    Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
      ?.items;
  
  const prevSlide = () => {
    if (BannerImg?.length === 1) {
      return;
    }
    setImgIndx(() =>
      imgIndx === 0 ? BannerImg?.length - 1 : imgIndx - 1
    );
  };

  const nextSlide = () => {
    if (BannerImg?.length === 1) {
      return;
    }
    setImgIndx(() =>
      imgIndx === BannerImg?.length - 1 ? 0 : imgIndx + 1
    );
  };

  return details === true ? (
    Array(images)
      .fill("")
      .map((e, index) => {
        return (
          items[index + start]?.image && (
            <Link to={`/product/${index + start}`} key={index + "BannerImg"}>
              <div className={`flex flex-col w-[7vw] h-32 mr-7     `}>
                <ProductCard key={index + 11} index={index} start={start} />
              </div>
            </Link>
          )
        );
      })
  ) : (
    <div className="relative h-full w-screen overflow-hidden">
      <Link
        to={`/product/${start}`}
        className="h-full min-w-fit overflow-hidden"
        key={"Banner"}
      >
        <img
          key={+0o0}
          src={BannerImg[imgIndx]}
          alt="Banner"
          className="slide h-full  transition duration-300 rounded-2xl"
        />
      </Link>
      <div className="absolute top-[35vh] w-full z-50 flex justify-between items-center     ">
        <button onClick={prevSlide}>
          <ChevronLeft color="black"  />
        </button>
        <button onClick={nextSlide}>
          <ChevronRight color="black" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
