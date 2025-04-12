import { Link, useNavigation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloudUpload, Heart, IndianRupee, Trash2 } from "lucide-react";
import Banner from "../../Genral purpose/Banner";
// import { Products } from "../../Utils/productImg";
import { alertError, alertInfo, alertSuccess } from "../../Utils/Alert";
import { ProductUpdationForm, ImageUpdationForm } from "./InputForm";
import InfiniteLoading from "../../../assets/img/Infinite-loading-2.svg";
import { FetchData } from "../../Utils/fetchFromAPI";
import { addWishlist, popFromWishlist } from "../../Utils/Slices/WishListSlice";

const Product = () => {
  // State variables
  const [showOption, setShowOption] = useState({
    updationOpt: false,
    imageUpdationForm: false,
    detailsUpdationForm: false,
  });
  const user = useSelector((store) => store.UserInfo.user);
  const allProducts = useSelector((store) => store.ProductsList.products);

  const Dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  const product =
    allProducts && allProducts.find((item) => item.productId == productId);
  // console.log(productId, product, allProducts);

  // Utility functions

  async function HandelDeleteProduct() {
    console.log("Delete btn", product);
    try {
      const result = await FetchData(
        `products/product-details/${product?._id}`,
        "delete"
      );
      console.log(result);
      alertInfo(result.message);
      window.location.href("/");
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
  }

  const handelUpdateImages = () => {
    setShowOption((prev) => ({
      ...prev,
      updationOpt: false,
      imageUpdationForm: true,
    }));
  };

  const handelUpdateDetails = () => {
    setShowOption((prev) => ({
      ...prev,
      updationOpt: false,
      detailsUpdationForm: true,
    }));
  };

  const HandelAddToCart = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);

    try {
      const response = await FetchData(
        `carts/cart/${product.productId}`,
        "post"
      );

      console.log("Added to your cart:", response.data);
      setLoading(false);
      setAddedToCart(true);
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
      const response = await FetchData(
        `carts/wishlist/${product.productId}`,
        "post"
      );

      console.log("Added to your wishlist:", response);
      setLoading(false);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      setLoading(false);
      // alertError();
    }
  };

  const HandelRemoveToWishlist = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);

    try {
      const response = await FetchData(
        `carts/wishlist/${product.productId}`,
        "delete"
      );

      console.log("Removed from wishlist:", response);
      setLoading(false);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error in removing product from wishlist:", error);
      setLoading(false);
      // alertError();
    }
  };

  // For checking if the product is liked or not and
  // if it is added to cart or not
  useEffect(() => {
    const CheckIsLiked = async () => {
      try {
        const response = await FetchData(
          `carts/wishlist/${product?.productId}`,
          "get"
        );
        console.log("Is liked:", response);
        setLike(response.data.data);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };
    const IsAddedToCart = async () => {
      try {
        const response = await FetchData(
          `carts/cart/${product?.productId}`,
          "get"
        );
        console.log("Is Added to cart:", response);
        setAddedToCart(response.data.data);
      } catch (error) {
        console.error("Error checking if liked:", error);
      }
    };

    CheckIsLiked();
    IsAddedToCart();
  }, [allProducts]);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return allProducts === null ? (
    <div></div>
  ) : (
    <div className="ProductPage">
      <div className="ProductDetails lg:h-[75vh] lg:my-16 relative lg:flex flex-wrap ">
        <div className="Image-section w-full h-[85vh]  lg:w-4/6 lg:h-full ">
          <div className="ProductImg h-[80vh] lg:h-full m-4 rounded-3xl bg-[#dadada] flex justify-center lg:items-center items-start overflow-hidden  ">
            <img
              src={product?.images[0].url}
              alt="PImg"
              className="lg:h-96 lg:mt-0 drop-shadow-2xl  "
            />
          </div>

          <div className="Name-and-Cart-btn flex justify-between lg:mt-5 mx-5 absolute lg:w-[62vw] lg:h-[70vh] h-[80vh] w-[90%] top-0   ">
            <div className="PName max-w-lg mx-16 cursor-default ">
              <h1 className="text-2xl font-bold ">{product?.name}</h1>
            </div>

            <div className="Price&cart lg:m-10 h-fit flex flex-col justify-center items-center absolute bottom-0 right-0">
              {product?.price?.wasPrice != null &&
                product?.price?.wasPrice != product?.price?.currentPrice && (
                  <div className="flex justify-center items-center">
                    <IndianRupee width={15} />
                    <h1 className="text-xl font-thin line-through">
                      {product?.price?.wasPrice}
                    </h1>
                  </div>
                )}

              <div className="Price flex items-center">
                <IndianRupee width={15} />
                <h1 className=" text-2xl font-medium ">
                  {product?.price?.currentPrice}
                </h1>
              </div>
              <div className="LikeBtn-And-AddToCart flex justify-center items-center">
                {like === true ? (
                  <button
                    className="Like m-4"
                    onClick={(event) => {
                      HandelRemoveToWishlist(event);
                      Dispatch(popFromWishlist(product));
                      setLike(false);
                    }}
                  >
                    <Heart fill="#ff0000" color="#ff0000" />
                  </button>
                ) : (
                  <button
                    className="Like m-4"
                    onClick={(event) => {
                      HandelAddToWishlist(event);
                      Dispatch(addWishlist(product));
                      setLike(true);
                    }}
                  >
                    <Heart color="#000000" />
                  </button>
                )}
                <button
                  onClick={HandelAddToCart}
                  className={`${
                    addedToCart ? "bg-gray-400" : "bg-green"
                  } w-28 h-12 my-4 text-white p-3 drop-shadow-xl rounded-full ${
                    !addedToCart && "hover:bg-Lgreen"
                  } ${
                    addedToCart && "cursor-not-allowed"
                  } hover:drop-shadow-2xl transition duration-200 ease-in-out hover:scale-105`}
                  disabled={addedToCart}
                >
                  {loading ? (
                    <div className=" w-full h-full flex justify-center items-center ">
                      <img
                        src={InfiniteLoading}
                        alt=""
                        className=" w-[6vw] h-[6vh]"
                      />
                    </div>
                  ) : addedToCart ? (
                    <h1>Added</h1>
                  ) : (
                    <h5>Add to Cart</h5>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="Details-Section lg:w-1/3 h-full  mt-5 ">
          <div className="bg-white relative mx-4 lg:h-full h-fit py-4 rounded-3xl overflow-hidden ">
            <h1 className="text-xl font-[700] font-serif text-center  my-5">
              {product?.description}
            </h1>
            <div className="Details w-fit m-4">
              <h1 className="text-2xl font-serif">Details</h1>
              <p className="tracking-wider font-extralight leading-relaxed">
                {product?.summery}
              </p>
            </div>

            {/* Update and Delete Btn */}
            {user != null && user[0].admin === true && (
              <div className="ProductUpdate-and-delete-btn relative flex justify-center items-center">
                {/* product Update Btn */}
                <div>
                  <button
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        updationOpt: !showOption.updationOpt,
                      }));
                    }}
                    className="flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
                  >
                    <span className="mx-2">Update</span>
                    <CloudUpload />
                  </button>

                  {showOption.updationOpt && (
                    <div className="absolute flex flex-col top-12 left-24">
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

      {showOption.detailsUpdationForm && (
        <ProductUpdationForm
          onClose={() =>
            setShowOption({
              updationOpt: false,
              detailsUpdationForm: false,
              imageUpdationForm: false,
            })
          }
          productId={product?.productId}
        />
      )}

      {showOption.imageUpdationForm && (
        <ImageUpdationForm
          onClose={() =>
            setShowOption({
              updationOpt: false,
              detailsUpdationForm: false,
              imageUpdationForm: false,
            })
          }
          productId={product._id}
          imagesRequired={() => {
            const requirement = 5 - product.images.length;
            return requirement;
          }}
        />
      )}

      <div className="Recommendation z-50">
        <div className="Heading relative flex justify-center items-center mb-5 cursor-default p-10 mt-10 lg:mt-0  ">
          {/* <div className="absolute lg:-top-4">
            <h1 className=" text-center text-6xl lg:text-9xl font-bold text-[#dadada78] ">
              Best Products
            </h1>
          </div> */}
          <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl lg:text-5xl font-bold txt-green font-Caveat">
              Recommendations
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 lg:gap-24 lg:m-10 grid-cols-2 gap-5 m-5 md:grid-cols-3 md:gap-10 md:m-10 items-center  ">
          <Banner
            images={allProducts.length}
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
