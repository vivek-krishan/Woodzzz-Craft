import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Heart, IndianRupee, Trash2 } from "lucide-react";
import Banner from "../../Genral purpose/Banner";
import { Products } from "../../Utils/productImg";
import { alertError, alertInfo, alertSuccess } from "../../Utils/Alert";
import { ProductUpdationForm } from "./InputForm";
import InfiniteLoading from "../../../assets/img/Infinite-loading-2.svg";
import { FetchData } from "../../Utils/fetchFromAPI";

const Product = () => {
  // State variables
  const [showOption, setShowOption] = useState({
    updationOpt: false,
    updationForm: false,
  });
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
  const [loading, setLoading] = useState(false);

  // Utility functions

  async function HandelDeleteProduct() {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      redirect: "follow",
    };
    try {
      const result = await FetchData(
        `update-product-details/${Products[index]?.id}`,
        "delete"
      );
      console.log(result);
      alertInfo(result.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
  }

  const handelUpdateImages = () => {
    setShowOption({
      updationOpt: false,
      updationForm: showOption.updationForm,
    });
  };

  const handelUpdateDetails = () => {
    setShowOption({
      updationOpt: false,
      updationForm: true,
    });
  };

  const HandelAddToCart = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);

    try {
      const response = await FetchData(`carts/cart/${123}`, "post");

      console.log("Added to your cart:", response.data);
      setLoading(false);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      setLoading(false);
      alertError();
    }
  };

  const HandelAddToWishlist = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);

    try {
      const response = await FetchData(`carts/cart/${123}`, "post");

      console.log("Added to your cart:", response.data);
      setLoading(false);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      setLoading(false);
      alertError();
    }
  };

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
                <button
                  onClick={HandelAddToCart}
                  className="bg-green w-28 h-12 my-4 text-white p-3 drop-shadow-xl rounded-full hover:bg-Lgreen hover:drop-shadow-2xl transition duration-200 ease-in-out hover:scale-105"
                >
                  {loading ? (
                    <div className=" w-full h-full flex justify-center items-center ">
                      <img
                        src={InfiniteLoading}
                        alt=""
                        className=" w-[6vw] h-[6vh]"
                      />
                    </div>
                  ) : (
                    <h5>Add to Cart</h5>
                  )}
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

            {/* Update and Delete Btn */}
            {user != null && user[0].admin === true && (
              <div className="ProductUpdate-and-delete-btn relative -bottom-52 flex justify-center items-center">
                {/* product Update Btn */}
                <div>
                  <button
                    onClick={() => {
                      setShowOption({
                        updationOpt: !showOption.updationOpt,
                        updationForm: false,
                      });
                    }}
                    className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
                  >
                    <span className="mx-2">Update</span>
                    <CloudUpload />
                  </button>

                  {showOption.updationOpt && (
                    <div className="absolute flex flex-col -top-24 left-24">
                      <button
                        onClick={handelUpdateImages}
                        className="px-2 pt-2 mt-2 hover:drop-shadow-xl scale-105 drop-shadow-lg border-b-4 border-r-2 rounded-xl hover:bg-slate-200 transition duration-150 ease-in-out "
                      >
                        Image Update
                      </button>
                      <button
                        onClick={handelUpdateDetails}
                        className="px-2 pt-2 mt-2 hover:drop-shadow-xl scale-105 drop-shadow-lg border-b-4 border-r-2 rounded-xl hover:bg-slate-200 transition duration-150 ease-in-out "
                      >
                        Details Update
                      </button>
                    </div>
                  )}
                </div>

                {/* product delete Btn */}
                <button
                  onClick={HandelDeleteProduct}
                  className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
                >
                  <span className="mx-2">Delete</span>
                  <Trash2 />
                </button>
              </div>
            )}
            {/* Update and Delete Btn */}
          </div>
        </div>
      </div>

      {showOption.updationForm && (
        <ProductUpdationForm
          onClose={() =>
            setShowOption({
              updationOpt: true,
              updationForm: false,
            })
          }
        />
      )}

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
