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

  // #f4f4f5

  return (
    <div className="w-full">
      <div className="Banner w-full h-[100vh] flex items-center ">
        <div className=" w-full h-[80vh] flex  justify-center overflow-x-scroll no-scrollbar before:absolute before:left-0 before:z-40 before:w-[30vw] before:h-[80vh] before:bg-gradient-to-r from-[#f4f4f5] to-transparent after:absolute after:z-40 after:w-[30vw] after:h-[80vh] after:right-0 after:bg-gradient-to-l from-[#f4f4f5] to-transparent">
          <Banner images={4} start={0} />
        </div>
        <div className=" flex justify-between absolute w-[92vw]">
          <button
            className="scale-150 z-50"
            onClick={() => {
              if (counter === 0) {
                setCounter(slides.length);
              }
              setCounter(counter - 1);
              goLeft();
            }}
          >
            <box-icon type="solid" name="left-arrow"></box-icon>
          </button>
          <button
            className="scale-150 z-50"
            onClick={() => {
              if (counter >= slides.length) {
                setCounter(0);
                return;
              }
              setCounter(counter + 1);
              goRight();
            }}
          >
            <box-icon type="solid" name="right-arrow"></box-icon>
          </button>
        </div>
      </div>
      <div className="Featured mb-20">
        <div className="Heading flex justify-center items-center z-0 mb-10 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-9xl font-bold text-[#dadadac7] ">
              SNICKERS
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center">
            <h1 className="text-center text-5xl font-bold">Featured</h1>
            <h5 className="text-center font-thin text-xl">products</h5>
          </div>
        </div>
        <div className="ProductList w-full h-fit ">
          <Crousel />
        </div>
      </div>
      <div className="Best_Seller h-fit">
        <div className="Heading flex justify-center items-center z-0 mb-5 cursor-default">
          <div className="absolute">
            <h1 className=" text-center text-9xl font-bold text-[#dadadac7] ">
              PRODUCT
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center">
            <h1 className="text-center text-5xl font-bold">Best Seller</h1>
            <h5 className="text-center font-thin text-xl">products</h5>
          </div>
        </div>
        <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  before:absolute before:left-0 before:z-40 before:w-44 before:h-60  before:bg-gradient-to-r from-[#f4f4f5] to-transparent ">
          <div className="flex felx-col h-40 min-w-40 m-10  ">
            <Banner images={10} start={10} details={true} width={"10vw"} />
          </div>
        </div>
      </div>
      <div className="ViewAll_btn flex justify-center m-20">
        <Link to={`/all`}>
          <button className="border border-black p-3 rounded-3xl hover:bg-white transition duration-300 hover:scale-105">
            View All products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
