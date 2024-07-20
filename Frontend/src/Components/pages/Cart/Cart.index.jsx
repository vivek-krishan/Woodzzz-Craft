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
        <div className="leftside w-2/5 mt-20">
          <section className="Account m-5 p-2 bg-green drop-shadow-xl text-white rounded-lg hover:drop-shadow-2xl transition duration-150 cursor-default"
          >
            <div className="flex justify-between items-center">
              <div className="Title-Name">
                <h1 className="Title text-lg font-extrabold font-serif">
                  Account
                </h1>
                <h3 className="text-gray-300 text-sm font-extralight ">
                  Your account information is visible here...
                </h3>
              </div>
              <div className="Show-btn mr-10">
                {isvisible === "account" ? (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight z-50 rounded-2xl"
                    onClick={() => SetIsVisible("")}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("account")}
                  >
                    Show
                  </button>
                )}
              </div>
            </div>
            {isvisible === "account" && (
              <div className="Details ">
                <h3 className="text-lg font-medium">Name: </h3>
                <h3 className="text-lg font-medium">Email: </h3>
                <h3 className="text-lg font-medium">Location:</h3>
              </div>
            )}
          </section>

          <section className="Address m-5 p-2 bg-green drop-shadow-xl text-white rounded-lg hover:drop-shadow-2xl transition duration-150 cursor-default">
            <div className="flex justify-between items-center">
              <div className="Title">
                <h1 className="Title text-lg font-extrabold font-serif">
                  Delivery address
                </h1>
                <h3 className="text-gray-200 text-sm font-extralight">
                  Please give your nearest location for fast and convenient
                  delivery
                </h3>
              </div>
              <div className="Show-btn mr-10">
                {isvisible === "address" ? (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("")}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("address")}
                  >
                    Show
                  </button>
                )}
              </div>
            </div>
            {isvisible === "address" && (
              <div className="Details">
                <h3 className="text-lg font-medium">Address:</h3>
              </div>
            )}
          </section>

          <section className="Payment m-5 p-2 bg-green drop-shadow-xl text-white rounded-lg hover:drop-shadow-2xl transition duration-150 cursor-default">
            <div className="flex justify-between items-center">
              <div className="Title">
                <h1 className="Title text-lg font-extrabold font-serif">
                  Payment
                </h1>
                <h3 className="text-gray-200 text-sm font-extralight">
                  Select your payment method
                </h3>
              </div>

              <div className="show-btn mr-10">
                {isvisible === "payment" ? (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("")}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="bg-gray-200 text-black w-16 font-extralight rounded-2xl"
                    onClick={() => SetIsVisible("payment")}
                  >
                    Show
                  </button>
                )}
              </div>
            </div>
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
