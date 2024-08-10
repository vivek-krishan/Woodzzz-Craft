import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Heart, IndianRupee, Trash2 } from "lucide-react";
import Banner from "../../Genral purpose/Banner";
import { Products } from "../../Utils/productImg";
import { alertError, alertInfo } from "../../Utils/Alert";

const Product = () => {
  // State variables
  const user = useSelector((store) => store.UserInfo.user);
  const Dispatch = useDispatch();
  const Cart = useSelector((store) => store.CartInfo.cart);
  const [like, setLike] = useState(false);
  const { index } = useParams();

  const [newProductDetails, setNewProductDetails] = useState({
    name: String,
    description: String,
    summery: String,
    price: Number,
    wasPrice: Number,
    rating: Number,
  });

  // Utility functions

  console.log(Products[index]);

  function HandelUpdateProduct() {}

  async function HandelDeleteProduct() {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      redirect: "follow",
    };
    try {
     

      fetch(
        `http://localhost:3000/api/v1/update-product-details/:productId`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          // console.log(result);
          alertInfo(result.message);
          navigate("/");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
  }

  return (
    <div className="ProductPage">
      <div className="ProductDetails h-[75vh] my-16 relative flex flex-wrap">
        <div className="Image-section  w-4/6 h-full">
          <div className="ProductImg h-full m-4 rounded-3xl bg-white flex justify-center items-center overflow-hidden">
            <img
              src={Products[index]?.img}
              alt="PImg"
              className="h-[70vh] drop-shadow-2xl "
            />
          </div>
          <div className="Name-and-Cart-btn flex justify-between mt-5 mx-5 absolute w-[62vw] h-[70vh] top-0 ">
            <div className="PName max-w-lg mx-16 cursor-default">
              <h1 className="text-2xl font-bold">{Products[index]?.name}</h1>
            </div>
            <div className="Price&cart m-10 h-fit flex flex-col justify-center items-center absolute bottom-0 right-0">
              {Products[index].wasPrice != null &&
                Products[index].wasPrice != Products[index]?.price && (
                  <div className="flex justify-center items-center">
                    <IndianRupee width={15} />
                    <h1 className="text-xl font-thin line-through">
                      {Products[index].wasPrice}
                    </h1>
                  </div>
                )}

              <div className="Price flex items-center">
                <IndianRupee width={15} />
                <h1 className=" text-2xl font-medium ">
                  {Products[index]?.price}
                </h1>
              </div>
              <div className="LikeBtn-And-AddToCart flex justify-center items-center">
                {like === true ? (
                  <button
                    className="Like m-4"
                    onClick={() => {
                      setLike(false);
                    }}
                  >
                    <Heart fill="#ff0000" color="#ff0000" />
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
                <button className="bg-green  my-4 text-white p-3 drop-shadow-xl rounded-full hover:bg-Lgreen hover:drop-shadow-2xl transition duration-200 ease-in-out hover:scale-105">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Details-Section w-1/3 h-full  mt-5 ">
          <div className="bg-white relative mx-4 h-full rounded-3xl overflow-hidden ">
            <h1 className="text-xl font-[700] font-serif text-center  my-5">
              {Products[index]?.description}
            </h1>
            <div className="Details w-full m-4">
              <h1 className="text-2xl font-serif">Details</h1>
              <p className="tracking-wider font-extralight leading-relaxed">
                {Products[index]?.details}
              </p>
            </div>
            {user != null && user[0].admin === true && (
              <div className="ProductUpdate-and-delete-btn relative -bottom-52 flex justify-center items-center">
                <button
                  onClick={HandelUpdateProduct}
                  className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
                >
                  <span className="mx-2">Update</span>
                  <CloudUpload />
                </button>
                <button
                  onClick={HandelDeleteProduct}
                  className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
                >
                  <span className="mx-2">Delete</span>
                  <Trash2 />
                </button>
              </div>
            )}
            {/* <div className="ProductUpdate-and-delete-btn relative -bottom-60 flex justify-center items-center">
              <button className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105">
                <span className="mx-2">Update</span>
                <CloudUpload />
              </button>
              <button className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105">
                <span className="mx-2">Delete</span>
                <Trash2 />
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="Recommendation">
        <div className="Heading relative flex justify-center items-center z-0 mb-5 cursor-default p-10  ">
          <div className="absolute -top-5">
            <h1 className=" text-center text-9xl font-bold text-[#dadada78] ">
              Recommended
            </h1>
          </div>
          <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="text-center text-5xl font-bold txt-green">
              Best Products
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-24 m-10">
          <Banner
            images={Products.length}
            start={0}
            details={true}
            width={"10vw"}
            height={"20vh"}
          />
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
};

export default Product;
