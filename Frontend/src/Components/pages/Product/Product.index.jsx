import { Link, useNavigation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudUpload,
  Heart,
  IndianRupee,
  Layers,
  Trash2,
} from "lucide-react";
import Banner from "../../Genral purpose/Banner";
// import { Products } from "../../Utils/productImg";
import { alertError, alertInfo, alertSuccess } from "../../Utils/Alert";
import { ProductUpdationForm, ImageUpdationForm } from "./InputForm";
import InfiniteLoading from "../../../assets/img/Infinite-loading-2.svg";
import { FetchData } from "../../Utils/fetchFromAPI";
import { addWishlist, popFromWishlist } from "../../Utils/Slices/WishListSlice";
// import optionImage from "../../../assets/img/options.png";
import { motion, AnimatePresence } from "framer-motion";
import LoadingUI from "../../Genral purpose/Loading";
import { parseErrorMessage } from "../../Utils/ErrorMessageParser";
import PopUp from "../../Genral purpose/PopUpWrapper";
import React from "react";
import Button from "../../Genral purpose/Buttons";

const Product = ({ startLoading, stopLoading }) => {
  const [isReadMoreDescription, setIsReadMoreDescription] = useState(false);
  const [isReadMoreSpecification, setIsReadMoreSpecification] = useState(false);
  const maxLength = 100;
  const toggleReadMore = () => {
    setIsReadMoreDescription(!isReadMoreDescription);
  };
  const toggleReadMoreSpecification = () => {
    setIsReadMoreSpecification(!isReadMoreSpecification);
  };
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
  const productPageRef = useRef(null);
  const [customizationPopup, setCustomizationPopup] = useState(false);
  // for customization details
  const [images, setImages] = useState(null);
  const customizationFormRef = useRef(null);

  const product =
    allProducts && allProducts.find((item) => item.productId == productId);
  // console.log(productId, product, allProducts);

  // Utility functions
  async function HandelDeleteProduct() {
    console.log("Delete btn", product);
    try {
      startLoading();
      const result = await FetchData(
        `products/product-details/${product?._id}`,
        "delete"
      );
      console.log(result);
      alertInfo(result.message);
      window.location.href("/");
    } catch (error) {
      console.error(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
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

    let formData;
    if (product.customization?.status) {
      formData = new FormData(customizationFormRef.current);
    }

    try {
      setLoading(true);
      const response = await FetchData(
        `carts/cart/${product.productId}`,
        "post",
        formData,
        true
      );

      console.log("Added to your cart:", response.data);
      setAddedToCart(true);
      setCustomizationPopup(false);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
     
      alertError(parseErrorMessage(error.response.data));
    } finally {
      setLoading(false);
    }
  };

  const HandelAddToWishlist = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    setLoading(true);

    try {
      startLoading();
      const response = await FetchData(
        `carts/wishlist/${product.productId}`,
        "post"
      );

      console.log("Added to your wishlist:", response);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const HandelRemoveToWishlist = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      startLoading();
      const response = await FetchData(
        `carts/wishlist/${product.productId}`,
        "delete"
      );

      console.log("Removed from wishlist:", response);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error in removing product from wishlist:", error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const HandleToggleStock = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      startLoading();
      const response = await FetchData(
        `products/toggle-stock/${product._id}`,
        "patch"
      );

      console.log("Stock status updated:", response);
      alertSuccess(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling stock status:", error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
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
        setLike(response.data.data);
      } catch (error) {
        console.error("Error checking if liked:", error);
      } finally {
      }
    };
    const IsAddedToCart = async () => {
      try {
        const response = await FetchData(
          `carts/cart/${product?.productId}`,
          "get"
        );
        setAddedToCart(response.data.data);
      } catch (error) {
        console.error("Error checking if liked:", error);
      } finally {
      }
    };

    CheckIsLiked();
    IsAddedToCart();
  }, [allProducts]);

  setTimeout(() => {
    productPageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);

  const ProductImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [popupImage, setPopupImage] = useState(null);

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % product?.images.length);
    };

    const prevImage = () => {
      setCurrentIndex(
        (prev) => (prev - 1 + product?.images.length) % product?.images.length
      );
    };

    return (
      <div className='flex flex-col items-center justify-center p-4 relative  w-full h-full'>
        <div className='w-full max-w-xl relative object-center py-96 flex justify-center items-center'>
          <img
            src={product?.images[currentIndex].url}
            alt={`Slide ${currentIndex}`}
            className='rounded-lg cursor-pointer object-center h-96 '
            onClick={() => setPopupImage(product?.images[currentIndex].url)}
          />
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 0 z-10'>
            <button
              onClick={prevImage}
              className='bg-white/80 text-black p-2 m-2  rounded-full lg:border-2 border-[#EB5A2A] lg:hover:bg-[#EB5A2A] lg:hover:text-white transition duration-300'
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div className='absolute top-1/2 right-0 transform -translate-y-1/2 z-10'>
            <button
              onClick={nextImage}
              className='bg-white/80 text-black p-2 m-2 rou rounded-full lg:border-2 border-[#EB5A2A] lg:hover:bg-[#EB5A2A] lg:hover:text-white transition duration-300'
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {popupImage && (
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPopupImage(null)}
            >
              <motion.img
                src={popupImage}
                alt='Popup'
                className='max-w-3xl max-h-[90vh] rounded-lg shadow-lg'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return allProducts === null ? (
    <div></div>
  ) : (
    <div ref={productPageRef} className='ProductPage'>
      <div className='ProductDetails lg:h-[75vh] lg:my-16 relative lg:flex flex-wrap '>
        <div className='Image-section w-full h-[85vh]  lg:w-4/6 lg:h-full '>
          <div className='ProductImg h-[70vh] lg:h-full m-4 rounded-3xl bg-[#dadada] flex justify-center lg:items-center items-center overflow-hidden '>
            {/* <img
              src={product?.images[0].url}
              alt="PImg"
              className="lg:h-96 lg:mt-0 drop-shadow-2xl  "
            /> */}
            <ProductImageSlider />
          </div>

          <div className='Name-and-Cart-btn flex justify-between lg:mt-5 mx-5 absolute lg:w-[62vw] lg:h-[70vh] h-[80vh] w-[90%] top-0   '>
            <div className='PName w-full  mx-16 cursor-default flex justify-evenly gap-10'>
              <h1 className='lg:text-2xl font-bold font-sans '>
                {product?.name}
              </h1>
              <div>
                {like === true ? (
                  <button
                    className='Like flex justify-center items-center gap-2 lg:border-2 border-[#EB5A2A] rounded-full px-4 py-2 hover:text-white hover:bg-[#EB5A2A] transition duration-300 ease-in-out'
                    onClick={(event) => {
                      HandelRemoveToWishlist(event);
                      Dispatch(popFromWishlist(product));
                      setLike(false);
                    }}
                  >
                    <Heart fill='#ff0000' color='#ff0000' />
                    <span className='text-xs hidden lg:block'>
                      Added to wishlist
                    </span>
                  </button>
                ) : (
                  <button
                    className='Like  flex justify-center items-center gap-2 lg:border-2 border-[#EB5A2A] rounded-full px-4 py-2 hover:text-white hover:bg-[#EB5A2A] transition duration-300 ease-in-out'
                    onClick={(event) => {
                      HandelAddToWishlist(event);
                      Dispatch(addWishlist(product));
                      setLike(true);
                    }}
                  >
                    <Heart color='#000000' />
                    <span className='text-xs hidden lg:block'>
                      Add to wishlist
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className='Price&cart lg:m-10 h-fit flex lg:flex-col lg:justify-center justify-evenly items-center absolute bottom-0 right-0 w-full lg:w-fit'>
              <div className='CurrentSellingPrice flex items-center'>
                <IndianRupee width={15} />
                <h1 className=' text-2xl font-medium '>
                  {product?.price?.currentPrice}
                </h1>
              </div>
              <div className='PreviousSellingPrice'>
                {product?.price?.wasPrice != null &&
                  product?.price?.wasPrice != product?.price?.currentPrice && (
                    <div className='flex justify-center items-center'>
                      <IndianRupee width={15} />
                      <h1 className='text-lg font-thin line-through'>
                        {product?.price?.wasPrice}
                      </h1>
                    </div>
                  )}
              </div>
              <div className='AddToCart flex justify-center items-center'>
                <button
                  onClick={(e) => {
                    if (product.customization?.status) {
                      setCustomizationPopup(true);
                    } else {
                      HandelAddToCart(e);
                    }
                  }}
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
                    <div className=' w-full h-full flex justify-center items-center '>
                      <img
                        src={InfiniteLoading}
                        alt=''
                        className=' w-[6vw] h-[6vh]'
                      />
                    </div>
                  ) : product.inStock ? (
                    addedToCart ? (
                      <h1>Added</h1>
                    ) : (
                      <h5>Add to Cart</h5>
                    )
                  ) : (
                    <h6>Out of Stock</h6>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='Details-Section lg:w-1/3 h-full  mt-5 '>
          <div className='bg-white relative mx-4 lg:h-full h-fit py-4 rounded-3xl shadow-xl flex flex-col justify-evenly items-center '>
            <div className='px-5'>
              <h1 className='font-Caveat font-bold text-2xl'>
                Product Description
              </h1>
              <span>
                <p className='text-gray-600 '>
                  {isReadMoreDescription
                    ? product?.description
                    : `${product?.description.substring(0, maxLength)}...`}
                </p>
                {product?.description.length > maxLength && (
                  <button className='text-blue-500' onClick={toggleReadMore}>
                    {isReadMoreDescription ? "Read Less.." : "Read More..."}
                  </button>
                )}
              </span>
            </div>
            <div className='Details w-fit m-4'>
              <div>
                <h1 className='font-Caveat font-bold text-2xl'>
                  Product Specifications
                </h1>
                <span>
                  <p className='text-gray-600'>
                    {isReadMoreSpecification
                      ? product?.summery
                      : `${product?.summery?.substring(0, maxLength)}...`}
                  </p>
                  {product?.summery?.length > maxLength && (
                    <button
                      className='text-blue-500'
                      onClick={toggleReadMoreSpecification}
                    >
                      {isReadMoreSpecification ? "Read Less.." : "Read More..."}
                    </button>
                  )}
                </span>
              </div>
            </div>

            {/* Update and Delete Btn */}
            {user != null && user[0].admin === true && (
              <div className='ProductUpdate-and-delete-btn relative flex flex-wrap gap-5 justify-center items-center'>
                {/* product Update Btn */}
                <div>
                  <button
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        updationOpt: !showOption.updationOpt,
                      }));
                    }}
                    className='flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105'
                  >
                    <span className='mx-2'>Update</span>
                    <CloudUpload />
                  </button>

                  {showOption.updationOpt && (
                    <div className='absolute flex flex-col lg:top-12 lg:left-20 gap-5 lg:mt-5 bg-white shadow-2xl p-4 z-20 lg:z-0 rounded-xl'>
                      <button
                        onClick={handelUpdateImages}
                        className='px-4 py-2 hover:drop-shadow-xl scale-105 drop-shadow-lg border hover:bg-[#EB5A2A] hover:text-white rounded-full transition duration-150 ease-in-out border-[#EB5A2A]'
                      >
                        Image Update
                      </button>
                      <button
                        onClick={handelUpdateDetails}
                        className='px-4 py-2 hover:drop-shadow-xl scale-105 drop-shadow-lg border hover:bg-[#EB5A2A] hover:text-white rounded-full transition duration-150 ease-in-out border-[#EB5A2A] '
                      >
                        Details Update
                      </button>
                    </div>
                  )}
                </div>

                {/* product delete Btn */}
                <button
                  onClick={HandelDeleteProduct}
                  className='flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105'
                >
                  <span className='mx-2'>Delete</span>
                  <Trash2 />
                </button>

                {/* Mark out of stock */}
                <button
                  onClick={HandleToggleStock}
                  className='flex mx-5 bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105'
                >
                  {product.inStock ? (
                    <span className='mx-2'>Mark Out of stock</span>
                  ) : (
                    <span className='mx-2'>Back to stock</span>
                  )}

                  <Layers />
                </button>
              </div>
            )}
            {/* Update and Delete Btn */}
          </div>
        </div>
      </div>

      {customizationPopup && (
        <PopUp onClose={() => setCustomizationPopup(false)}>
          <div className='w-[60vw] flex justify-center items-center top-0 left-0'>
            <form
              ref={customizationFormRef}
              className='w-2/3 h-fit p-16 rounded-2xl  bg-white'
            >
              <label
                className='block mb-2 font-medium text-black text-2xl'
                for='file_input'
              >
                Customization Details
              </label>
              {product.customization.customizationType === "image" ? (
                <div className='w-full h-60 flex flex-wrap gap-5 justify-center items-center mt-10 '>
                  <div className='flex items-center space-x-6'>
                    <div className='shrink-0'>
                      {images && (
                        <img
                          id='preview_img'
                          className='h-16 aspect-video object-cover rounded'
                          src={images?.src}
                          alt='uploaded image'
                        />
                      )}
                    </div>
                    <label className='block'>
                      <span className='sr-only'>Choose photo</span>
                      <input
                        type='file'
                        accept='image/*'
                        name='customization'
                        className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 border border-neutral-200 px-6 py-5 rounded-full'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImages({
                              id: Math.random(),
                              src: reader.result,
                            });
                          };
                          reader.readAsDataURL(file);
                          // console.log(images);
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type='text'
                    name='data'
                    id=''
                    placeholder='Enter your text'
                    className='w-full px-4 py-2 mb-10 text-gray-700 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200 ease-in-out hover:shadow-md'
                  />
                </div>
              )}

              <Button onClick={HandelAddToCart}>Submit</Button>
            </form>
          </div>
        </PopUp>
      )}

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

      <div className='Recommendation z-50'>
        <div className='Heading relative flex justify-center items-center mb-5 cursor-default p-10 mt-10 lg:mt-0  '>
          {/* <div className="absolute lg:-top-4">
            <h1 className=" text-center text-6xl lg:text-9xl font-bold text-[#dadada78] ">
              Best Products
            </h1>
          </div> */}
          <div className='z-10 flex flex-col items-center justify-center'>
            <h1 className='text-center text-4xl lg:text-5xl font-bold txt-green font-Caveat'>
              Recommendations
            </h1>
          </div>
        </div>
        <div className='grid lg:grid-cols-5 lg:gap-24 lg:m-10 grid-cols-2 gap-5 m-5 md:grid-cols-3 md:gap-10 md:m-10 items-center  '>
          <Banner images={[5, 15]} />
        </div>
      </div>
      <div className='ViewAll_btn flex justify-center m-20'>
        <Link to={`/all-products`}>
          <button className=' bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105'>
            View All products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoadingUI(Product);
