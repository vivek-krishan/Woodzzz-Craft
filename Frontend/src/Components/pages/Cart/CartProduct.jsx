import { Trash2 } from "lucide-react";
import { alertSuccess, alertError, alertInfo } from "../../Utils/Alert";
import { FetchData } from "../../Utils/fetchFromAPI";
import LoadingUI from "../../Genral purpose/Loading";
import { useState } from "react";
import { parseErrorMessage } from "../../Utils/ErrorMessageParser";

const CartProduct = ({ item, startLoading, stopLoading }) => {
  const [updatedItem, setUpdatedItem] = useState(item);

  const handelAddQuantity = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      startLoading();
      const response = await FetchData(
        `carts/cart/${item.cartProduct.productId}`,
        "post"
      );

      setUpdatedItem(response.data.data);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      alertError(parseErrorMessage(error.response.data));
      alertError();
    } finally {
      stopLoading();
    }
  };

  const handelSubtractQuantity = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (item.quantity <= 1) {
      alertInfo("It's the minimum quantity!");
      stopLoading();
      return;
    }

    try {
      startLoading();
      const response = await FetchData(
        `carts/cart/subtract/${item.cartProduct.productId}`,
        "post"
      );

      setUpdatedItem(response.data.data);
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const handelDeleteItemFromCart = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      startLoading();
      const response = await FetchData(
        `carts/cart/${item.cartProduct.productId}`,
        "delete"
      );

      setUpdatedItem({});
      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error uploading product:", error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <div className=" w-full h-fit m-2 lg:mt-4 overflow-hidden bg-white rounded-xl drop-shadow-lg hover:drop-shadow-2xl transition delay-100 grid grid-cols-4 items-center  grid-rows-1 gap-4">
        {/* Image */}
        <div className="w-fit h-fit m-2">
          <img
            src={updatedItem?.cartProduct?.images[0].url}
            alt="product"
            className="w-full"
          />
        </div>

        {/* Name */}
        <p className="font-medium text-lg">{updatedItem?.cartProduct?.name}</p>

        {/* Quantity */}
        <div className="flex justify-between items-center m-2">
          <button
            className="font-medium text-lg"
            onClick={handelSubtractQuantity}
          >
            -
          </button>
          <div>
            <p className="font-medium text-sm">Qty: {updatedItem?.quantity}</p>
            <p className="m-2 font-medium text-sm">
              {updatedItem?.cartProduct?.price?.currentPrice}
            </p>
          </div>
          <button className="font-medium text-lg" onClick={handelAddQuantity}>
            +
          </button>
        </div>

        {/* Price */}
        <p className="font-medium text-lg">
          {updatedItem?.cartProduct?.price.currentPrice * updatedItem?.quantity}
        </p>

        {/* Delete Button */}
        <button
          onClick={handelDeleteItemFromCart}
          className="w-full h-full bg-red-500 text-white font-medium text-lg col-span-4"
        >
          <span className="flex justify-center items-center gap-2">
            Delete <Trash2 size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoadingUI(CartProduct);
