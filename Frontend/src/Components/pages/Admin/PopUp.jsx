import React, { useState, useRef, useEffect } from "react";
import { Images } from "lucide-react";
import axios from "axios";
import { alertError, alertSuccess } from "../../Utils/Alert";
import InfiniteLoading from "../../../assets/img/Infinite-Loading.svg";
import { useSelector } from "react-redux";

const PopUp = ({ onClose }) => {
  // Variable
  const modelRef = useRef();
  const LoadingRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Utility Functions
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  // Input fields UI
  const InputForm = () => {
    // Variables
    const formRef = useRef(null);
    const [existingProductIds, setExistingProductIds] = useState([]);
    const [isUnique, setIsUnique] = useState(true);
    const [inputImage, setInputImage] = useState(null);
    const AllProducts = useSelector((store) => store.ProductsList.products);

    // Utility Functions

    const handleImageChange = (event) => {
      setInputImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission

      setLoading(true);

      if (!inputImage) {
        alertError("Please Give the product Image");
        throw new Error("Please give product image");
      }

      // Create a FormData object from the form reference
      const formData = new FormData(formRef.current);
      formData.append("Image", inputImage); // Append the image file to the formData

      const url = "http://localhost:3000/api/v1/products/";
      const AccessToken = localStorage.getItem("AccessToken");

      //  console.log("AccessToken:", AccessToken);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`,
          },
          withCredentials: true,
        });

        console.log("Product uploaded successfully:", response.data);
        setLoading(false);
        alertSuccess(response.data.message);
        formRef.current = "";
      } catch (error) {
        setLoading(false);
        alertError(error.message);
        console.error("Error uploading product:", error);
      }
    };

    useEffect(() => {
      const fetchProductIds = () => {
        // Extract product IDs from the products
        console.log(AllProducts)
        AllProducts.map((product) => {
          existingProductIds.push(product.productId);
        });
      };

      fetchProductIds();
    }, []);

    const handleProductIdChange = (event) => {
      const value = Number(event.target.value); // Convert to number

      // Debugging logs
      console.log("All Products:", AllProducts);
      console.log("Existing Product IDs:", existingProductIds);
      console.log("Entered Product ID:", value);

      // Check if the entered product ID is unique
      if (existingProductIds.includes(value)) {
        setIsUnique(false);
      } else {
        setIsUnique(true);
      }
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-white text-lg"
      >
        <div className="" ref={LoadingRef}></div>
        <section className="flex justify-center items-center w-full">
          <div className="w-1/4 p-5 flex flex-col justify-center items-center">
            <h5 className="text-xl mb-4 underline font-serif ">
              Upload Product Image
            </h5>

            {/* Image file Input Field */}
            {inputImage != null ? (
              <div className="bg-gray-700 w-full h-10 rounded-lg mx-5 flex items-center justify-center gap-4 ">
                <Images />
                <h3 className="font-Caveat">{inputImage.name}</h3>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-center w-full ">
                  <label
                    htmlFor="ProductImage"
                    className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    </div>

                    <input
                      id="ProductImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      name="ProductImage"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="w-3/4 flex flex-col p-5 ">
            {/* Product Id */}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="productId" className="m-1 ">
                  Product Id
                </label>
                <input
                  type="number"
                  name="productId"
                  // value={productDetails.productId}
                  onChange={handleProductIdChange}
                  id="productId"
                  required={true}
                  placeholder="Please enter number"
                  className="px-3 py-2 rounded-xl  text-black"
                />
              </div>
              {!isUnique && (
                <h5 className="text-red-500 text-xs font-sans select-none">
                  This id is already provided! Please choose a unique one
                </h5>
              )}
            </div>

            {/* Product Name */}
            <label htmlFor="name" className="m-1 ">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              // value={productDetails.name}
              // onChange={HandelInputChange}
              id="name"
              required={true}
              placeholder="Product Name"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/*Description */}
            <label htmlFor="description" className="m-1 ">
              Description
            </label>
            <input
              type="text"
              name="description"
              // value={productDetails.description}
              // onChange={HandelInputChange}
              id="description"
              required={true}
              placeholder="product Description"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/*summery */}
            <label htmlFor="summery" className="m-1 ">
              Summary
            </label>
            <input
              type="text"
              name="summery"
              // value={productDetails.summery}
              // onChange={HandelInputChange}
              id="summary"
              required={true}
              placeholder="About Product"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/* Old price */}
            <label htmlFor="oldPrice" className="m-1 ">
              Old Price
            </label>
            <input
              type="number"
              name="oldPrice"
              // value={productDetails.oldPrice}
              // onChange={HandelInputChange}
              id="oldPrice"
              required={true}
              placeholder="Maximum retail Price"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/* newPrice */}
            <label htmlFor="newPrice" className="m-1 ">
              New Price
            </label>
            <input
              type="number"
              name="newPrice"
              // value={productDetails.newPrice}
              // onChange={HandelInputChange}
              id="newPrice"
              required={true}
              placeholder="Offer Price"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/* Rating */}
            <label htmlFor="rating" className="m-1 ">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              // value={productDetails.rating}
              // onChange={HandelInputChange}
              id="rating"
              required={true}
              placeholder="Rating"
              className="px-3 py-2 rounded-xl  text-black"
            />
          </div>
        </section>

        <div className="w-1/4 flex justify-evenly items-center">
          <button
            type="submit"
            className="py-2 px-4 rounded-xl bg-green-400 text-white hover:bg-green-500"
          >
            Submit
          </button>

          <button
            onClick={() => formRef.current.reset()}
            className="py-2 px-4 rounded-xl bg-red-400 text-white hover:bg-red-500"
          >
            Reset
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-gray-400 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-3xl bg-opacity-85  h-screen w-full"
    >
      <div className="flex bg-opacity-100 w-full items-center justify-center h-screen">
        <div className="fixed transform -translate-x-50 -translate-y-50 w-full h-[90%] rounded-md shadow-md ">
          {loading && (
            <div className="absolute w-[50vw] h-[50vh] left-96 top-32 bg-slate-600/40 rounded-3xl flex justify-center items-center">
              <img src={InfiniteLoading} alt="" />
            </div>
          )}
          <InputForm />
        </div>
      </div>
    </div>
  );
};

export { PopUp };
