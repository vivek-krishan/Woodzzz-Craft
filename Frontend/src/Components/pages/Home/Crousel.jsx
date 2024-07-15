import { Link } from "react-router-dom";
import Banner from "../../Genral purpose/Banner";
import ProductCard from "./ProductCard";

const Crousel = () => {
  return (
    <div className="Crousel flex ">
      <div className="CaptainImg m-10 min-w-fit">
        <Link to={`/product/${1}`} key={"BannerImg"}>
          <div className={`flex flex-col w-[25vw] h-96    mr-7 `}>
            <ProductCard key={11} index={1} start={1} />
          </div>
        </Link>
      </div>
      <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  before:absolute before:left-[27vw] before:z-40 before:w-44 before:h-3/5  before:bg-gradient-to-r from-[#d2b48c] to-transparent ">
        <div className="flex felx-col h-40 min-w-40 m-10  ">
          <Banner images={10} start={10} details={true} />
        </div>
        <div className="flex felx-col h-40 min-w-40 m-10  ">
          <Banner images={10} start={30} details={true} />
        </div>
      </div>
    </div>
  );
};

export default Crousel;
