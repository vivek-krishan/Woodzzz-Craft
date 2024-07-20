import { Link } from "react-router-dom";
import Banner from "../../Genral purpose/Banner";
import ProductCard from "./ProductCard";

const Crousel = () => {
  return (
    <div className="Crousel flex ">
      <div className="CaptainImg ml-10 my-10 min-w-fit">
        <Link to={`/product/${2}`} key={"BannerImg"}>
          <div
            className={`flex flex-col w-[25vw] h-[50vh] rounded-2xl  mr-7 z-50 `}
          >
            <ProductCard key={11} index={2} start={1} width={"25vw"}  />
          </div>
        </Link>
      </div>
      <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  before:absolute before:left-[27vw] before:z-40 before:w-44 before:h-4/6  before:bg-gradient-to-r from-[#d2b48c] to-transparent  ">
        <div className="flex  h-40 min-w-40 m-10 ml-20 mb-14 ">
          <Banner
            images={10}
            start={0}
            details={true}
            width={"10vw"}
            height={"20vh"}
          />
        </div>
        <div className="flex h-64 min-w-40 m-10 ml-20  ">
          <Banner
            images={10}
            start={0}
            details={true}
            width={"10vw"}
            height={"20vh"}
          />
        </div>
      </div>
    </div>
  );
};

export default Crousel;
