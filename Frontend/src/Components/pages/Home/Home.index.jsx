import Banner from "../../Genral purpose/Banner";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import { BannerSlider } from "../../Genral purpose/Banner-Slider";

function Home() {
  return (
    <div className="w-full ">
      <div className="Banner lg:mb-20 hidden md:block">
        <BannerSlider />
      </div>

      <div className="Best_Seller h-fit mb-20 mt-10 lg:mt-0 ">
        <div className="Heading flex justify-center items-center  mb-5 cursor-default">
          {/* <div className="absolute">
            <h1 className=" text-center text-7xl lg:text-9xl font-bold text-[#dadada78]  ">
              PRODUCTS
            </h1>
          </div> */}
          <div className=" flex flex-col items-center font-Caveat">
            <h1 className="text-center text-3xl lg:text-6xl font-bold txt-green z-10">
              Best selling products
            </h1>
          </div>
        </div>
        <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col justify-center items-start">
          <div className="flex gap-5 m-5 lg:ml-10 mt-10 lg:mt-20 ">
            <Banner
              images={[0,10]}
              
            />
          </div>
        </div>
      </div>

      <div className="Featured mb-20 mt-10 lg:mt-0 ">
        <div className="Heading flex justify-center items-center  mb-10 cursor-default">
          {/* <div className="absolute">
            <h1 className=" text-center text-7xl lg:text-9xl font-bold text-[#dadada78]  ">
              Crafts
            </h1>
          </div> */}
          <div className=" flex flex-col items-center font-Caveat ">
            <h1 className="text-center text-3xl lg:text-5xl font-bold  pt-4 txt-green z-10">
              Handicrafts
            </h1>
          </div>
        </div>
        <div className="ProductList w-full h-fit ">
          <Carousel />
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
