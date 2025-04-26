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
import PopUp from "../../Genral purpose/PopUpWrapper";
import Button from "../../Genral purpose/Buttons";
import LoadingUI from "../../Genral purpose/Loading";
import { parseErrorMessage } from "../../Utils/ErrorMessageParser";

const ProductUpdationForm1 = ({
  onClose,
  productId,
  startLoading,
  stopLoading,
}) => {
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
      const formData = new FormData(formRef.current);

      try {
        startLoading();
        FetchData(`products/product-details/${productId}`, "post", formData)
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
      } catch (error) {
        console.error("Error uploading product:", error);
        alertError(parseErrorMessage(error.response.data));
      } finally {
        stopLoading();
      }
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center text-white text-lg"
      >
        <div className=""></div>
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
          <InputForm productId={productId} />
        </div>
      </div>
    </div>
  );
};

const ImageUpdationForm1 = ({
  onClose,
  productId,
  imagesRequired,
  startLoading,
  stopLoading,
}) => {
  const [images, setImages] = useState([]);

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log(productId);
    try {
      startLoading();
      const response = await FetchData(
        `products/img-update/${productId}`,
        "post",
        formData,
        true
      );

      console.log("Image uploaded", response.data);
      alertSuccess(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <PopUp onClose={onClose}>
      <div className="flex justify-center items-center bg-black bg-opacity-50 h-screen w-screen absolute top-0 left-0">
        <form ref={formRef} className="w-2/3 h-fit p-16 rounded-2xl  bg-white">
          <label
            class="block mb-2 font-medium text-black text-2xl"
            for="file_input"
          >
            Upload Images
          </label>
          <div className="w-full h-60 flex flex-wrap gap-5 justify-center items-center mt-10 ">
            {Array(imagesRequired())
              .fill("")
              .map((_, index) => {
                return (
                  <div class="flex items-center space-x-6" key={index}>
                    <div class="shrink-0">
                      {images[index] && (
                        <img
                          id="preview_img"
                          class="h-16 aspect-video object-cover rounded"
                          src={images[index]?.src}
                          alt="uploaded image"
                        />
                      )}
                    </div>
                    <label class="block">
                      <span class="sr-only">Choose photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        name="images"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 border border-neutral-200 px-6 py-5 rounded-full"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImages((prevImages) => [
                              ...prevImages,
                              {
                                id: Math.random(),
                                src: reader.result,
                              },
                            ]);
                          };
                          reader.readAsDataURL(file);
                          // console.log(images);
                        }}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
    </PopUp>
  );
};

const ProductUpdationForm = LoadingUI(ProductUpdationForm1);
const ImageUpdationForm = LoadingUI(ImageUpdationForm1);

export { ProductUpdationForm, ImageUpdationForm };
