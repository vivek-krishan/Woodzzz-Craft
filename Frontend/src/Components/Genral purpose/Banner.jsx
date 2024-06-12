import { Link } from "react-router-dom";
import Data from "../Utils/Data.json";
import ProductCard from "../pages/Home/ProductCard";
import { BannerImg } from "../pages/Home/BannerImg";
import { useSelector } from "react-redux";

const Banner = ({ images, start, details, width, data }) => {
  // const FilteredItem = useSelector((store) => store.FilteredData.items);
  // console.log(FilteredItem);

  var items = [];

  if (data) {
    items = data;
  } else {
    items =
      Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
        ?.items;
  }

  return details === true ? (
    Array(images)
      .fill("")
      .map((e, index) => {
        return (
          items[index + start]?.image && (
            <Link to={`/product/${index + start}`} key={index + "BannerImg"}>
              <div
                className={`flex flex-col min-w-[${width}] mr-7 ${
                  width === "7vw" && "m-10"
                } `}
              >
                <ProductCard key={index + 11} index={index} start={start} />
              </div>
            </Link>
          )
        );
      })
  ) : (
    <div className=" h-full flex flex-row ">
      {Array(images)
        .fill("")
        .map((e, index) => {
          return (
            <Link
              to={`/product/${index + start}`}
              className="h-full min-w-fit"
              key={"Banner" + index}
            >
              <img
                key={index + 0o0}
                src={BannerImg[index]}
                alt="Banner"
                className="slide h-full mx-3 transition duration-300 rounded-2xl"
              />
            </Link>
          );
        })}
    </div>
  );
};

export default Banner;
