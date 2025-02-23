import { Link } from "react-router-dom";
import Banner from "../../Genral purpose/Banner";
import ProductCard from "./ProductCard";
import { ProductCardAI } from "../../Genral purpose/product-card";

const Carousel = () => {
  return (
    <div className="Carousel flex z-20 justify-between items-center">
      <div className="CaptainImg h-fit ml-20 ">
        <Link
          to={`/product/${2}`}
          className="flex flex-col w-[25vw] h-fit rounded-2xl z-50  "
          key={"BannerImg"}
        >
          <ProductCardAI key={11} index={2} />
        </Link>
      </div>
      <div className="Players overflow-hidden overflow-x-scroll w-[69vw] no-scrollbar flex flex-col  before:absolute before:left-[31vw]  before:z-40 before:w-44 before:h-3/4  before:bg-gradient-to-r from-[#d2b48c] to-transparent   ">
        <div className="flex gap-5 m-5 ml-20   ">
          <Banner images={10} details={true} width={"10vw"} height={"20vh"} />
        </div>
        <div className="flex gap-5 m-5 ml-20  ">
          <Banner images={10} details={true} width={"10vw"} height={"20vh"} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
