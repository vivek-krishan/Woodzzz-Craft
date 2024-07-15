import Data from "../../Utils/Data.json";
import { Products } from "../../Utils/productImg";

const ProductCard = ({ index, start }) => {
  const items =
    Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
      ?.items;

  return (
    <div className="w-full h-full">
      <div className="w-full h-full overflow-hidden">
        <img
          key={index + "img"}
          src={Products[index]?.img}
          alt="Banner"
          className="slide w-full  transition duration-200 rounded-xl"
        />
      </div>
      <div className="details m-2 flex justify-evenly">
        <div>
          <h5 className="text-xs">
            Rating : {items[index + start]?.rating?.averageRating}
          </h5>
        </div>
        <div>
          <h5 className="text-xs">
            Price :- {items[index + start]?.priceInfo?.linePrice}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
