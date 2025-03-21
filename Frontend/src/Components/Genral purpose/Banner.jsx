import { Link } from "react-router-dom";
import { ProductCardAI } from "./product-card";

const Banner = ({ images }) => {
  return Array(images)
    .fill("")
    .map((e, index) => {
      return (
        <Link
          key={index + 11}
          to={`/product/${index}`}
          className={`bg-Tan rounded-xl h-fit`}
        >
          <div className=" lg:w-48 w-40 md:w-full ">
            <ProductCardAI index={index} />
          </div>
        </Link>
       
      );
    });
};

export default Banner;
