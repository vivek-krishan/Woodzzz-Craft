import { Link } from "react-router-dom";
import Banner from "../../Genral purpose/Banner";
import ProductCard from "./ProductCard";
import { ProductCardAI } from "../../Genral purpose/product-card";
import { useSelector } from "react-redux";

const Carousel = () => {
  const Products = useSelector((store) => store.ProductsList.products);

  return (
    <div className="Carousel flex flex-col lg:flex-row  lg:justify-between lg:items-center ">
      <div className="CaptainImg h-fit lg:ml-20 ">
        <Link
          to={`/product/${Products?.[2]?.productId}`}
          className="flex flex-col w-3/4 lg:w-[25vw] m-auto h-fit rounded-2xl  "
          key={"BannerImg"}
        >
          <ProductCardAI key={11} product={Products?.[2]} />
        </Link>
      </div>

      <div className="Players lg:overflow-hidden lg:overflow-x-scroll overflow-x-scroll lg:w-[69vw] no-scrollbar flex flex-col    ">
        <div className="flex gap-5 m-5 lg:ml-20   ">
          <Banner images={10} details={true} width={"10vw"} height={"20vh"} />
        </div>
        <div className="gap-5 m-5 lg:ml-20 hidden lg:flex">
          <Banner images={10} details={true} width={"10vw"} height={"20vh"} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
