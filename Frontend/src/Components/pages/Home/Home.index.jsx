import { useState, useEffect } from "react";
// import { goLeft, goRight } from "../utils/SlideImg";
import Banner from "../../Genral purpose/Banner";
import Crousel from "./Crousel";
import { Link } from "react-router-dom";

function Home() {
  const [counter, setCounter] = useState(0);
  const slides = document.querySelectorAll(".slide");

  const goRight = () => {
    slideImg();
  };
  const goLeft = () => {
    slideImg();
  };

  const slideImg = () => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  };

  useEffect(() => {
    slides.forEach((i, index) => {
      i.style.left = `${index * 100}%`;
    });
  }, []);

  // Css for Banner div containing banner for white gradient from side wise

  // <---  before:absolute before:left-0 before:z-40 before:w-[30vw] before:h-[80vh] before:bg-gradient-to-r from-[#f4f4f5] to-transparent after:absolute after:z-40 after:w-[30vw] after:h-[80vh] after:right-0 after:bg-gradient-to-l from-[#f4f4f5] to-transparent --->

  return (
    <div className="w-full">
      <div className="Banner my-20 w-full h-[80vh] overflow-hidden rounded-[40px]    flex  justify-center items-center drop-shadow-2xl">
        <div className=" before:absolute before:rounded-[40px]  before:left-0 before:z-40 before:w-[30vw] before:h-[81vh] before:bg-gradient-to-r from-[#f4f4f5d2] to-transparent after:absolute after:rounded-[40px] after:z-40 after:w-[30vw] after:h-[80vh] after:right-0 after:top-0  after:bg-gradient-to-l from-[#f4f4f5c8] to-transparent  ">
          <Banner images={4} start={0} />
        </div>
      </div>
      
      <div className="Featured mb-20">
        <div className="Heading flex justify-center items-center z-0 mb-10 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-9xl font-bold text-[#dadada76] ">
              SNICKERS
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center ">
            <h1 className="text-center text-5xl font-bold txt-green">
              Featured
            </h1>
            <h5 className="text-center font-thin text-xl txt-Gray">products</h5>
          </div>
        </div>
        <div className="ProductList w-full h-fit ">
          <Crousel />
        </div>
      </div>
      <div className="Best_Seller h-fit">
        <div className="Heading flex justify-center items-center z-0 mb-5 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-9xl font-bold text-[#dadada78] ">
              PRODUCT
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center">
            <h1 className="text-center text-5xl font-bold txt-green">
              Best Seller
            </h1>
          </div>
        </div>
        <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  before:absolute before:left-0 before:z-40 before:w-44 before:h-72  before:bg-gradient-to-r from-[#d2b48c] to-transparent ">
          <div className="flex h-64 min-w-40 m-10  ">
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
      <div className="ViewAll_btn flex justify-center m-20">
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
