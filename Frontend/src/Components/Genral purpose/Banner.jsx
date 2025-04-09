import { Link } from "react-router-dom";
import { ProductCardAI } from "./product-card";
import { useSelector } from "react-redux";

const Banner = ({ images }) => {
  const Products = useSelector((store) => store.ProductsList.products);

  const productSubset = Products && Products.slice(0, images);
  // console.log(productSubset);

  return productSubset?.map((item, index) => {
    return (
      <Link
        key={index + 11}
        to={`/product/${item?.productId}`}
        className={`bg-Tan rounded-xl h-fit`}
      >
        <div className=" lg:w-48 w-40 md:w-full ">
          <ProductCardAI product={item} />
        </div>
      </Link>
    );
  });
};

export default Banner;
