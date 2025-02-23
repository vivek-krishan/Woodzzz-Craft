import Banner from "../../Genral purpose/Banner";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import { BannerSlider } from "../../Genral purpose/Banner-Slider";

function Home() {

  return (
    <div className="w-full ">
      <div className="Banner my-20 hidden md:block">
        <BannerSlider />
      </div>

      <div className="Featured mb-20 mt-10 lg:mt-0">
        <div className="Heading flex justify-center items-center z-0 mb-10 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-7xl lg:text-9xl font-bold text-[#dadada76] ">
              Crafts
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center ">
            <h1 className="text-center text-3xl lg:text-5xl font-bold txt-green pt-4 ">
              Featured
            </h1>
          </div>
        </div>
        <div className="ProductList w-full h-fit ">
          <Carousel />
          {/* <ProductCardAI index={0} width={"25vw"}  /> */}
        </div>
      </div>

      <div className="Best_Seller h-fit">
        <div className="Heading flex justify-center items-center z-0 mb-5 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-7xl lg:text-9xl font-bold text-[#dadada78] ">
              PRODUCT
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center">
            <h1 className="text-center text-3xl lg:text-5xl font-bold txt-green">
              Best Seller
            </h1>
          </div>
        </div>
        <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  lg:before:absolute lg:before:left-0 lg:before:z-40 lg:before:w-44 lg:before:h-80 lg:before:mt-16 lg:before:bg-gradient-to-r from-[#d2b48c] to-transparent ">
          <div className="flex gap-5 m-5 lg:ml-20 mt-10 lg:mt-20 ">
            <Banner
              images={10}
              start={10}
              details={true}
              width={"10vw"}
              height={"20vh"}
            />
          </div>
        </div>
      </div>

      <div className="ViewAll_btn flex justify-center lg:m-20 m-10">
        <Link to={`/all-products`}>
          <button className=" bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105">
            View All products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
