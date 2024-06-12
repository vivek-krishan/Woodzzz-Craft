import { useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [isvisible, SetIsVisible] = useState("account");
  const Cart = useSelector((store) => store.CartInfo.cart);
  const [price, setPrice] = useState(null);

  // const CartResponse = await fetch()

  return (
    <div className="h-[70vh]">
      <div className="Cart_Heading w-full flex justify-center">
        <h1 className="font-bold text-3xl">Check Out</h1>
      </div>
      <div className="MainContainer_for_Cart flex justify-evenly">
        <div className="leftside w-2/5">
          <section className="Account m-5 p-2 bg-[#f2f4f3] drop-shadow-xl ">
            <h1 className="Title text-lg font-extrabold">Account</h1>
            <h3 className="text-gray-500 text-sm font-extralight">
              Your account information is visible here...
            </h3>
            {isvisible === "account" ? (
              <button
                className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                onClick={() => SetIsVisible("")}
              >
                Hide
              </button>
            ) : (
              <button
                className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                onClick={() => SetIsVisible("account")}
              >
                Show
              </button>
            )}
            {isvisible === "account" && (
              <div className="Details ">
                <h3 className="text-lg font-medium">Name: ,</h3>
                <h3 className="text-lg font-medium">Email: ,</h3>
                <h3 className="text-lg font-medium">Location:</h3>
              </div>
            )}
          </section>
          <section className="Address m-5 p-2 bg-[#f2f4f3] drop-shadow-xl">
            <div>
              <h1 className="Title text-lg font-extrabold">Delivery address</h1>
              <h3 className="text-gray-500 text-sm font-extralight">
                Please give your nearest location for fast and convinent
                delivery
              </h3>
              {isvisible === "address" ? (
                <button
                  className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                  onClick={() => SetIsVisible("")}
                >
                  Hide
                </button>
              ) : (
                <button
                  className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                  onClick={() => SetIsVisible("address")}
                >
                  Show
                </button>
              )}
              {isvisible === "address" && (
                <div className="Details">
                  <h3 className="text-lg font-medium">Name: ,</h3>
                  <h3 className="text-lg font-medium">Email: ,</h3>
                  <h3 className="text-lg font-medium">Location:</h3>
                </div>
              )}
            </div>
          </section>
          <section className="Payment m-5 p-2 bg-[#f2f4f3] drop-shadow-xl">
            <div>
              <h1 className="Title text-lg font-extrabold">Payment</h1>
              <h3 className="text-gray-500 text-sm font-extralight">
                Select your payment method
              </h3>
              {isvisible === "payment" ? (
                <button
                  className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                  onClick={() => SetIsVisible("")}
                >
                  Hide
                </button>
              ) : (
                <button
                  className="bg-gray-600 text-white w-16 font-extralight rounded-2xl"
                  onClick={() => SetIsVisible("payment")}
                >
                  Show
                </button>
              )}
              {isvisible === "payment" && (
                <div>
                  <h3 className="text-lg font-medium font-serif mx-6 my-2">
                    Paytm
                  </h3>
                  <h3 className="text-lg font-medium font-serif mx-6 my-2">
                    Gpay
                  </h3>
                  <h3 className="text-lg font-medium font-serif mx-6 my-2">
                    Phonepay
                  </h3>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className="RightSide w-2/5 p-5">
          <h1 className="text-xl text-center font-bold">Your Products</h1>
          {Cart.cartItems.map((item) => {
            // setPrice(price +item.priceInfo.linePrice)
            return <CartProduct item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
