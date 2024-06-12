import Data from "../../Utils/Data.json";

const ProductCard = ({ index, start }) => {
  const items =
    Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
      ?.items;

  return (
    <div className="">
      <div className="w-full">
        <img
          key={index + "img"}
          src={items[index + start]?.image}
          alt="Banner"
          className="slide h-full mx-3 transition duration-200 rounded-xl"
        />

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
    </div>
  );
};

export default ProductCard;
