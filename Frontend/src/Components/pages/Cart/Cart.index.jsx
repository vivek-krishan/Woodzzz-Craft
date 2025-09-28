import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import Puppy from "../../../assets/img/puppy.png";
import PopUp from "../../Genral purpose/PopUpWrapper";
import { clearUser, addUser } from "../../Utils/Slices/UserInfoSlice";
import { useDispatch } from "react-redux";
import { FetchData } from "../../Utils/fetchFromAPI";
import { alertError, alertInfo, alertSuccess } from "../../Utils/Alert";
import LoadingUI from "../../Genral purpose/Loading";
import Button from "../../Genral purpose/Buttons";
import AllOrders from "./all-orders";
import { parseErrorMessage } from "../../Utils/ErrorMessageParser";

const Cart = ({ startLoading, stopLoading }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((store) => store.UserInfo.user);
  const [selectAddress, setSelectAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);
  const AddressFormRef = useRef();
  const Dispatch = useDispatch();
  const [CartProducts, SetCartProducts] = useState([]);
  const [paymentPopup, setPaymentPopup] = useState(false);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const formData = new FormData(AddressFormRef.current);

    try {
      startLoading();
      const response = await FetchData("user/add-address", "post", formData);
      
      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.user));
      alertInfo(response.data.message);
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      setAddAddress(false);
      stopLoading();
    }
  };

  const handleActiveAddress = async (_id) => {
    try {
      startLoading();
      const response = await FetchData("user/select-address", "post", {
        addressId: _id,
      });
      
      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.user));

      alertInfo(response.data.message);
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const getActivatedAddress = (user) => {
    
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
      
      alertSuccess(response.data.message);
      SetCartProducts([]);
      stopLoading();
      return response.data.data._id;
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const OnlinePayment = async (e) => {
    setPaymentPopup(false);

    let orderId;
    try {
      orderId = await handleOrder(e);
      if (!orderId) {
        alert("Failed to create order. Please try again.");
        return;
      }
    } catch (error) {
      
      alertError(parseErrorMessage(error.response.data));
      return;
    }

    if (!orderId) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const order = await FetchData("payment/create-new-paymentId", "post", {
      options: {
        // amount: (getTotalPayablePrice() * 1.1).toFixed(2),
        amount: totalPrice,
        currency: "INR",
        receipt: `Woodz-craft receipt_${orderId}`, // Ensure receipt is unique
      },
    });

    var options = {
      key: process.env.razorpay_key_id, // Enter the Key ID generated from the Dashboard
      order_id: order.data.data.id, // ✅ Correct key for order-based payments
      name: "Woodz Craft",
      description: "Monthly Test Plan",
      image: "/Logo.png",
      handler: async function (response) {
      
        const body = {
          ...response,
          amount: order.data.data.amount, // Pass correct amount
          paymentMethod: "online",
          orderId: orderId,
        };

        const isValidated = await FetchData(
          "payment/validate-payment",
          "post",
          body
        );

        if (isValidated.status === 450) {
          alertError("Payment Failed");
        } else if (isValidated.status === 201) {
          alertSuccess("Payment Successful😊");
          setPaymentPopup(false);
        }
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
  };

  useEffect(() => {
    setActiveAddress(getActivatedAddress(user));
  }, [user]);

  const getCartProducts = async () => {
    try {
      startLoading();
      const response = await FetchData(`carts/cart`, "get");
      
      SetCartProducts(response.data.data);
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
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
    <div className='lg:h-fit'>
      <div className='Cart_Heading w-full lg:flex items-center  p-4 relative'>
        <h1 className='font-bold text-3xl lg:absolute lg:left-1/2  transform lg:-translate-x-1/2'>
          Check Out
        </h1>
        {user === null || user.length === 0 ? (
          <div></div>
        ) : (
          <div
            className=' ml-auto whitespace-nowrap cursor-pointer flex flex-col  transition duration-150 ease-in-out bg-white drop-shadow-lg px-2 py-2 rounded-xl'
            onClick={() => setSelectAddress(true)}
          >
            <span className=' txt-orange hover:txt-orange text-right  underline '>
              {activeAddress?.street}, {activeAddress?.city},{" "}
              {activeAddress?.state},{activeAddress?.pinCode}
            </span>
            <span className='text-xs text-center'>
              Click here to select/add address
            </span>
          </div>
        )}
      </div>

      {user === null || user.length === 0 ? (
        // If user is not logged in
        // Show this
        <div className=''>
          {/* <h1 className="text-black">data not found</h1> */}
          <div className='flex w-full'>
            <section className='login_or_register text-black flex flex-col w-1/2  items-center justify-center '>
              <h1 className='w-full text-center text-5xl font-medium font-serif p-5 txt-green  '>
                You are not Logged in
              </h1>
              <h1 className='w-full text-center text-xl font-light font-Caveat  text-black '>
                Kindly Login Or Register to view your Cart.
              </h1>
            </section>
            <section className='image flex w-1/2 justify-center items-center z-50'>
              <img src={Puppy} className='w-1/2' />
            </section>
          </div>
        </div>
      ) : (
        <div className='MainContainer_for_Cart flex flex-col'>
          <div className='User-details-and-cart-products flex lg:justify-evenly flex-col lg:flex-row'>
            {/* User details */}

            {selectAddress && (
              <PopUp onClose={() => setSelectAddress(false)}>
                <div className='lg:w-[50vw] lg:h-52 lg:-right-80 lg:-top-2 rounded-xl flex flex-col items-center bg-Tan py-5 text-black border'>
                  <div className='lg:w-5/6'>
                    
                    {user[0].address.map((address) => {
                      return (
                        <div
                          key={address.street}
                          className='flex justify-between items-center p-2 mb-2 border-b-2'
                        >
                          <div className='flex items-center gap-3 min-h-10 w-[80%] h-fit bg-white px-4 rounded-xl drop-shadow-lg'>
                            <span className='text-sm lg:text-base col-span-3'>
                              {address.street},
                            </span>
                            <span className='text-sm lg:text-base row-start-2'>
                              {address.city},
                            </span>
                            <span className='text-sm lg:text-base row-start-2'>
                              {address.state},
                            </span>
                            <span className='text-sm lg:text-base row-start-2'>
                              {address.pinCode}
                            </span>
                          </div>
                          <button
                            onClick={() => handleActiveAddress(address._id)}
                            className={`${
                              address.activated
                                ? "bg-Lgreen p-2 text-white"
                                : "bg-gray-200 border-[#EB5A2A] border p-2"
                            } text-black px-2 font-light rounded-2xl`}
                          >
                            {address.activated ? "Selected" : "Select"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className='bg-Lgreen text-white w-40 px-1 py-1 font-light rounded-2xl drop-shadow-lg hover:bg-green hover:drop-shadow-2xl transition duration-150 ease-in-out'
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
                    className='Address w-full m-5 mx-10 text-white bg-Tan txt-green p-20 rounded-2xl flex flex-col gap-5'
                  >
                    <label className='block mb-2 text-lg w-fit font-serif txt-green'>
                      Address
                    </label>
                    <div className=' grid grid-cols-4 grid-rows-2 gap-4 w-full  '>
                      <input
                        type='text'
                        className='col-span-4 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 txt-green text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-800  focus:outline-none focus:border-b-2 focus:border-white bg-white '
                        name='street'
                        placeholder='Street'
                        required
                      />
                      <input
                        type='text'
                        className='row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 txt-green text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-800  focus:outline-none focus:border-b-2 focus:border-white bg-white '
                        name='city'
                        placeholder='city'
                        required
                      />
                      <input
                        type='text'
                        className='row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 txt-green text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-800  focus:outline-none focus:border-b-2 focus:border-white bg-white '
                        name='state'
                        placeholder='state'
                        required
                      />
                      <input
                        type='text'
                        className='row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 txt-green text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-800  focus:outline-none focus:border-b-2 focus:border-white bg-white '
                        name='country'
                        placeholder='country'
                        required
                      />
                      <input
                        type='number'
                        className='row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 txt-green text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-800  focus:outline-none focus:border-b-2 focus:border-white bg-white'
                        name='pinCode'
                        placeholder='Pin Code'
                        required
                      />
                    </div>
                    <button
                      className='relative border-2 rounded-xl w-80 self-center px-2 py-1 inline cursor-pointer text-xl font-bold bg-Lgreen drop-shadow-xl hover:bg-green hover:scale-105 transition duration-200 ease-in-out'
                      onClick={handleAddAddress}
                    >
                      Add
                    </button>
                  </form>
                </PopUp>
              </>
            )}

            {paymentPopup && (
              <PopUp onClose={() => setPaymentPopup(false)}>
                <div className='lg:w-[40vw] lg:h-40 lg:-right-80 lg:-top-2 rounded-xl flex justify-center items-center bg-Tan py-5 text-black border'>
                  <div className='lg:w-5/6 flex justify-evenly items-center'>
                    {/* <Button onClick={handleOrder}>Cash on delivery</Button> */}
                    <Button onClick={OnlinePayment}>Online payment</Button>
                  </div>
                </div>
              </PopUp>
            )}

            {/* Cart products */}
            <div className='LeftSide lg:w-2/5 p-5 mt-10'>
              <h1 className='text-xl text-center font-bold'>Your Products</h1>
              {CartProducts?.map((item) => {
                return <CartProduct item={item} key={item._id} />;
              })}

              <div className=' w-full h-fit m-2 lg:mt-4 overflow-hidden bg-white rounded-xl drop-shadow-lg hover:drop-shadow-2xl transition delay-100 grid grid-cols-4 items-center  grid-rows-1 gap-4'>
                <p className='text-xl p-2 col-span-3'>Total</p>
                <p className='text-lg col-start-4'>Rs. {totalPrice} </p>
              </div>
              <div className='flex justify-center items-center w-full '>
                <Button
                  className={`w-full`}
                  onClick={() => {
                    if (CartProducts.length === 0) {
                      alertInfo("Your cart is empty");
                      return;
                    }
                    setPaymentPopup(true);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
          <div className='my-10 '>
            <AllOrders />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingUI(Cart);
