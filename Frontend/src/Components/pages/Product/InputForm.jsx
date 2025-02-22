import axios from "axios";
import { Images } from "lucide-react";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { alertError, alertSuccess } from "../../Utils/Alert";
import InfiniteLoading from "../../../assets/img/Infinite-Loading.svg";
import { FetchData } from "../../Utils/fetchFromAPI";
import {
  clearProducts,
  addProducts,
  updateProduct,
} from "../../Utils/Slices/ProductSlice";
import { useDispatch } from "react-redux";

const ProductUpdationForm = ({ onClose, productId }) => {
  // Variable
  const modelRef = useRef();
  const LoadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const Dispatch = useDispatch();

  // Utility Functions
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  // Input fields UI
  const InputForm = ({ productId }) => {
    // Variables
    const formRef = useRef(null);
    console.log("productId from input form", productId);
    // Utility Functions

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission

      setLoading(true); // Show the loading spinner

      const formData = new FormData(formRef.current);

      console.log(productId);
      try {
        const response = FetchData(
          `products/product-details/${productId}`,
          "post",
          formData
        )
          .then((response) => {
            console.log("Product uploaded successfully:", response);
            Dispatch(updateProduct(response.data.data.product));
            alertSuccess(response.data.message);
            formRef.current.reset();
            closeModel(event);
          })
          .catch((error) => {
            console.error("Error uploading product:", error);
          });

        setLoading(false);
      } catch (error) {
        console.error("Error uploading product:", error);
        setLoading(false);
      }
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-white text-lg"
      >
        <div className="" ref={LoadingRef}></div>
        <h2 className="text-xl font-serif text-black underline ">
          Give the updated details
        </h2>
        <section className="flex justify-center items-center w-full">
          <div className="w-3/4 flex flex-col p-5 ">
            {/* Product Name */}
            <label htmlFor="name" className="m-1 ">
              New Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required={true}
              placeholder="Product Name"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/*Description */}
            <label htmlFor="description" className="m-1 ">
              New Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              required={true}
              placeholder="product Description"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/*summery */}
            <label htmlFor="summery" className="m-1 ">
              New Summary
            </label>
            <input
              type="text"
              name="summery"
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
              id="newPrice"
              required={true}
              placeholder="Offer Price"
              className="px-3 py-2 rounded-xl  text-black"
            />

            {/* Rating */}
            <label htmlFor="rating" className="m-1 ">
              New Rating
            </label>
            <input
              type="number"
              name="rating"
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
        <div className="fixed bg-gray-700/30 transform -translate-x-50 -translate-y-50 w-[80vw] h-[90%] rounded-md shadow-md ">
          {loading && (
            <div className="absolute w-[50vw] h-[50vh] left-96 top-32 bg-slate-600/40 rounded-3xl flex justify-center items-center">
              <img src={InfiniteLoading} alt="" />
            </div>
          )}

          <InputForm productId={productId} />
        </div>
      </div>
    </div>
  );
};

export { ProductUpdationForm };
