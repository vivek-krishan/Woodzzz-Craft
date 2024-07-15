import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Data from "../../Utils/Data.json";
import Banner from "../../Genral purpose/Banner";
import { addCartItem } from "../../Utils/Slices/CartInfoSlice";
import HandelCartData from "../../Utils/HandelCartData";
import { Heart } from "lucide-react";

const Product = () => {
  const userData = useSelector((store) => store.UserInfo.user);
  const Dispatch = useDispatch();
  const Cart = useSelector((store) => store.CartInfo.cart);
  const [like, setLike] = useState(false);
  const { index } = useParams();
  const Info =
    Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
      ?.items[index];
  let userId;
  if (userData) {
    userId = userData[0]?.user?._id;
  }

  const HandelCartItems = async (e) => {
    e.preventDefault();
    console.log(userId);
    if (userId) Dispatch(addCartItem(Info));
    else alert("Please LogIn");
  };

  useEffect(() => {
    HandelCartData(userId, Cart.cartItems);
  }, [Cart]);

  return (
    <div className="ProductPage">
      <div className="ProductDetails relative">
        <div className="ProductImg h-[75vh] m-4 rounded-3xl bg-white flex justify-center items-center overflow-hidden">
          <img src={Info?.image} alt="PImg" className="h-[80vh]" />
        </div>
        <div className="PDetails flex justify-between m-8 absolute w-[85vw] h-[74vh] top-0 ">
          <div className="PName max-w-lg mx-16 cursor-default">
            <h1 className="text-2xl font-bold">{Info?.name}</h1>
          </div>
          <div className="PPrice&cart m-20 h-fit flex flex-col justify-center items-center absolute bottom-0 right-0">
            {Info?.priceInfo?.wasPrice != null && (
              <h1 className="text-xl font-thin line-through">
                {Info?.priceInfo?.wasPrice}
              </h1>
            )}
            <h1 className="text-2xl font-medium ">
              {Info?.priceInfo?.linePrice}
            </h1>
            <div className="flex justify-center items-center">
              {like === true ? (
                <button
                  className="Like m-4"
                  onClick={() => {
                    setLike(false);
                  }}
                >
                  <Heart color="#ff0000" />
                </button>
              ) : (
                <button
                  className="Like m-4"
                  onClick={() => {
                    setLike(true);
                  }}
                >
                  <Heart color="#000000" />
                </button>
              )}
              <button
                className="bg-black my-4 text-white p-3  rounded-full hover:bg-gray-200 hover:text-black transition duration-200 ease-in-out hover:scale-105"
                onClick={HandelCartItems}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white relative bottom-12 m-4 h-fit rounded-3xl">
            <h1 className="text-xl font-extralight text-center ">
              {Info?.description}
            </h1>
            <div className="PStory w-100%  m-5 bg-gray-100">
              <h1 className="font-bold text-2xl text-center ">Product Story</h1>
              <p className="tracking-wider font-extralight leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores sapiente tenetur quas assumenda eaque eveniet libero
                dolorem, nobis inventore. Ullam fuga optio provident unde ipsum,
                sint odit a perspiciatis vitae hic odio iure quae minus iste
                numquam delectus accusantium expedita!
              </p>
            </div>
            <div className="flex  bg-gray-100">
              <div className="Features w-1/2 m-4 ">
                <h1 className="text-2xl font-semibold text-center">Features</h1>
                <p className="tracking-wider font-extralight leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores sapiente tenetur quas assumenda eaque eveniet
                  libero dolorem, nobis inventore. Ullam fuga optio provident
                  unde ipsum, sint odit a perspiciatis vitae hic odio iure quae
                  minus iste numquam delectus accusantium expedita!
                </p>
              </div>
              <div className="Details w-1/2 m-4">
                <h1 className="text-2xl text-center font-semibold">Details</h1>
                <p className="tracking-wider font-extralight leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores sapiente tenetur quas assumenda eaque eveniet
                  libero dolorem, nobis inventore. Ullam fuga optio provident
                  unde ipsum, sint odit a perspiciatis vitae hic odio iure quae
                  minus iste numquam delectus accusantium expedita!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Recommendation">
        <div>
          <h1 className="text-3xl font-thin text-center">
            Recommended Products
          </h1>
        </div>
        <div className="grid grid-cols-4 m-10">
          <Banner images={32} start={1} details={true}  />
        </div>
      </div>
      <div className="ViewAll_btn flex justify-center m-20">
        <Link to={`/all`}>
          <button className="border border-black p-3 rounded-3xl hover:bg-white transition duration-300 hover:scale-105 ">
            View All products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
