import React from "react";
import { useRef } from "react";
import { useState } from "react";

const PopUp = ({ onClose }) => {
  const AddProductForm = () => {
    const formRef = useRef();
    const [Form, setForm] = useState({});

    return (
      <form
        ref={formRef}
        className="flex flex-col justify-center items-center text-white text-lg"
      >
        <section className="flex justify-center items-center w-full">
          <div className="w-1/4 p-5">
            <label className="m-1 ">Product Image</label>
            <input
              type="file"
              multiple
              accept="image/*"
              name="productImage"
              //   value={Form.address}
              //   onChange={handleChange}
              id="productImage"
              required={true}
              placeholder="Address"
              className="px-3 py-2 rounded-xl text-black"
            />
          </div>
          <div className="w-3/4 flex flex-col p-5 ">
            <label className="m-1 ">Product Id</label>
            <input
              type="number"
              name="product_id"
              //   value={Form.name}
              //   onChange={handleChange}
              id="product_id"
              required={true}
              placeholder="product id"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">Product Name</label>
            <input
              type="name"
              name="name"
              //   value={Form.number}
              //   onChange={handleChange}
              id="name"
              required={true}
              placeholder="Product Name"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">Description</label>
            <input
              type="text"
              name="description"
              //   value={Form.address}
              //   onChange={handleChange}
              id="description"
              required={true}
              placeholder="product Description"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">Summary</label>
            <input
              type="text"
              name="summary"
              //   value={Form.address}
              //   onChange={handleChange}
              id="summary"
              required={true}
              placeholder="About Product"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">Old Price</label>
            <input
              type="number"
              name="oldPrice"
              //   value={Form.address}
              //   onChange={handleChange}
              id="oldPrice"
              required={true}
              placeholder="Maximum retail Price"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">New Price</label>
            <input
              type="number"
              name="newPrice"
              //   value={Form.address}
              //   onChange={handleChange}
              id="newPrice"
              required={true}
              placeholder="Offer Price"
              className="px-3 py-2 rounded-xl  text-black"
            />
            <label className="m-1 ">Rating</label>
            <input
              type="number"
              name="rating"
              //   value={Form.address}
              //   onChange={handleChange}
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
            Add Product
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

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };
  const modelRef = useRef();

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-3xl bg-opacity-85 border h-screen w-full"
    >
      <div className="flex bg-opacity-100 w-full items-center justify-center h-screen">
        <div className="fixed transform -translate-x-50 -translate-y-50 w-full h-[90%] rounded-md shadow-md">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
