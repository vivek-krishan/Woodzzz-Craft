import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import Puppy from "../../../assets/img/puppy.png";
import PopUp from "../../Genral purpose/PopUpWrapper";
import { clearUser, addUser } from "../../Utils/Slices/UserInfoSlice";
import { useDispatch } from "react-redux";
import { FetchData } from "../../Utils/fetchFromAPI";
import { alertInfo, alertSuccess } from "../../Utils/Alert";
import LoadingUI from "../../Genral purpose/Loading";
import Button from "../../Genral purpose/Buttons";
import AllOrders from "./all-orders";

const Cart = ({ startLoading, stopLoading }) => {
  const [isvisible, SetIsVisible] = useState("account");
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((store) => store.UserInfo.user);
  const [selectAddress, setSelectAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);
  const AddressFormRef = useRef();
  const Dispatch = useDispatch();
  const [CartProducts, SetCartProducts] = useState([]);

  const handleAddAddress = async () => {
    const formData = new FormData(AddressFormRef.current);

    try {
      const response = await FetchData("user/add-address", "post", formData);
      console.log(response);
      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.user));

      alertInfo(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setAddAddress(false);
    }
  };

  const handleActiveAddress = async (_id) => {
    try {
      const response = await FetchData("user/select-address", "post", {
        addressId: _id,
      });
      console.log(response);
      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.user));

      alertInfo(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getActivatedAddress = (user) => {
    // console.log(user);
    if (user === null) return null;
    return user[0]?.address.find((addr) => addr.activated === true) || null;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    startLoading();
    if (activeAddress === null) {
      alertInfo("Please select an address");
      stopLoading();
      return;
    }

    try {
      const response = await FetchData("orders/", "post", {
        totalPrice,
      });
      console.log(response);
      alertSuccess(response.data.message);
      SetCartProducts([]);
      stopLoading();
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };

  useEffect(() => {
    setActiveAddress(getActivatedAddress(user));
  }, [user]);

  const getCartProducts = async () => {
    try {
      const response = await FetchData(`carts/cart`, "get");
      console.log(response);
      SetCartProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [user]);

  // Use useMemo to compute the total price efficiently
  const calculatedTotalPrice = useMemo(() => {
    return CartProducts?.reduce(
      (acc, item) =>
        acc + item?.cartProduct.price.currentPrice * item?.quantity,
      0
    );
  }, [CartProducts]);

  // Update the state only when the calculated total price changes
  useEffect(() => {
    setTotalPrice(calculatedTotalPrice);
  }, [calculatedTotalPrice]);

  return (
    <div className="lg:h-fit">
      <div className="Cart_Heading w-full flex justify-center">
        <h1 className="font-bold text-3xl">Check Out</h1>
      </div>

      {user === null || user.length === 0 ? (
        // If user is not logged in
        // Show this
        <div className="">
          {/* <h1 className="text-black">data not found</h1> */}
          <div className="flex w-full">
            <section className="login_or_register text-black flex flex-col w-1/2  items-center justify-center ">
              <h1 className="w-full text-center text-5xl font-medium font-serif p-5 txt-green  ">
                You are not Logged in
              </h1>
              <h1 className="w-full text-center text-xl font-light font-Caveat  text-black ">
                Kindly Login Or Register to view your Cart.
              </h1>
            </section>
            <section className="image flex w-1/2 justify-center items-center">
              <img src={Puppy} className="w-1/2" />
            </section>
          </div>
        </div>
      ) : (
        <div className="MainContainer_for_Cart flex flex-col">
          <div className="User-details-and-cart-products flex lg:justify-evenly flex-col lg:flex-row">
            {/* User details */}
            <div className="leftside lg:w-2/5 lg:mt-20">
              <section className="Account m-5 p-2 bg-green drop-shadow-xl text-white rounded-lg hover:drop-shadow-2xl transition duration-150 cursor-default">
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
                  <div className="Details mt-5">
                    <h3 className="text-sm font-medium">
                      Name:{" "}
                      <span className="text-lg font-serif">
                        {user[0].fullName}
                      </span>{" "}
                    </h3>
                    <h3 className="text-sm font-medium">
                      Email:{" "}
                      <span className="text-lg font-serif">
                        {user[0].email}
                      </span>
                    </h3>
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
                  <div className="flex justify-start items-center">
                    <div className="Details grid grid-cols-3 grid-rows-1 mt-5 min-w-[70%]">
                      <span className="text-sm font-serif col-span-3">
                        {activeAddress?.street},{" "}
                      </span>
                      <span className="text-sm font-serif row-start-2">
                        {activeAddress?.city},{" "}
                      </span>
                      <span className="text-sm font-serif row-start-2">
                        {activeAddress?.state},
                      </span>
                      <span className="text-sm font-serif row-start-2">
                        {activeAddress?.pinCode}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        className="bg-gray-200 text-black px-1 font-extralight rounded-2xl mb-2"
                        onClick={() => setSelectAddress(!selectAddress)}
                      >
                        Select Address
                      </button>
                    </div>
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

              {selectAddress && (
                <PopUp onClose={() => setSelectAddress(false)}>
                  <div className="w-[30vw] h-52 -right-80 -top-2 rounded-xl flex flex-col items-center bg-blue-200/45 overflow-scroll  border">
                    <div className="w-5/6">
                      {user[0].address.map((address) => {
                        return (
                          <div
                            key={address.street}
                            className="flex justify-between items-center p-2 mb-2 border-b-2 "
                          >
                            <div className="grid grid-cols-3 grid-rows-1 w-[80%] h-fit">
                              <span className="text-sm font-serif col-span-3">
                                {address.street},
                              </span>
                              <span className="text-sm font-serif row-start-2">
                                {address.city},
                              </span>
                              <span className="text-sm font-serif row-start-2">
                                {address.state},
                              </span>
                              <span className="text-sm font-serif row-start-2">
                                {address.pinCode}
                              </span>
                            </div>
                            <button
                              onClick={() => handleActiveAddress(address._id)}
                              className="bg-gray-200 text-black px-1 font-extralight rounded-2xl"
                            >
                              Select
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="bg-gray-200 text-black w-40 px-1 py-1 font-extralight rounded-2xl"
                      onClick={() => setAddAddress(true)}
                    >
                      Add Address
                    </button>
                  </div>
                </PopUp>
              )}
              {addAddress && (
                <>
                  <PopUp onClose={() => setAddAddress(false)}>
                    <form
                      ref={AddressFormRef}
                      onSubmit={handleAddAddress}
                      className="Address w-full m-5 mx-10 text-white bg-Tan p-20 rounded-2xl flex flex-col gap-5"
                    >
                      <label className="block mb-2 text-lg w-fit font-serif txt-green">
                        Address
                      </label>
                      <div className=" grid grid-cols-4 grid-rows-2 gap-4 w-full  ">
                        <input
                          type="text"
                          className="col-span-4 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-100  focus:outline-none focus:border-b-2 focus:border-black "
                          name="street"
                          placeholder="Street"
                          required
                        />
                        <input
                          type="text"
                          className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-100  focus:outline-none focus:border-b-2 focus:border-black "
                          name="city"
                          placeholder="city"
                          required
                        />
                        <input
                          type="text"
                          className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-100  focus:outline-none focus:border-b-2 focus:border-black "
                          name="state"
                          placeholder="state"
                          required
                        />
                        <input
                          type="text"
                          className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-100  focus:outline-none focus:border-b-2 focus:border-black "
                          name="country"
                          placeholder="country"
                          required
                        />
                        <input
                          type="number"
                          className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-100 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-100  focus:outline-none focus:border-b-2 focus:border-black"
                          name="pinCode"
                          placeholder="Pin Code"
                          required
                        />
                      </div>
                      <button
                        className="relative border-2 rounded-xl w-80 self-center px-2 py-1 inline cursor-pointer text-xl font-bold before:bg-green before:rounded-xl before:absolute before:-bottom-0 before:-left-0 before:h-full before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 before:text-white before:block before:z-0 before:content-['add']"
                        onClick={handleAddAddress}
                      >
                        Add
                      </button>
                    </form>
                  </PopUp>
                </>
              )}
            </div>

            {/* Cart products */}
            <div className="RightSide lg:w-2/5 p-5">
              <h1 className="text-xl text-center font-bold">Your Products</h1>
              {CartProducts?.map((item) => {
                return <CartProduct item={item} key={item._id} />;
              })}

              <div className=" w-full h-fit m-2 lg:mt-4 overflow-hidden bg-white rounded-xl drop-shadow-lg hover:drop-shadow-2xl transition delay-100 grid grid-cols-4 items-center  grid-rows-1 gap-4">
                <p className="text-xl p-2 col-span-3">Total</p>
                <p className="text-lg col-start-4">Rs. {totalPrice} </p>
              </div>
              <div className="flex justify-center items-center w-full border">
                <Button className={`w-full`} onClick={handleOrder}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
          <div className="my-10">
            <AllOrders />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingUI(Cart);
