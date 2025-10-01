import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../Utils/FormatDateTime";
import { FetchData } from "../../Utils/fetchFromAPI";
import { ChevronDown, ChevronUp } from "lucide-react";
import LoadingUI from "../../Genral purpose/Loading";
import { alertSuccess } from "../../Utils/Alert";
import Button from "../../Genral purpose/Buttons";

function AdminAllOrders({ startLoading, stopLoading, allOrders }) {
  // const [allOrders, setAllOrders] = useState([]);
  const [handlePopup, setHandlePopup] = useState({});

  const handleMarkCompleted = async (orderId) => {
    try {
      startLoading();
      const response = await FetchData(
        `dashboard/complete-order/${orderId}`,
        "post",
        {}
      );

      alertSuccess(response.data.message);
    } catch (error) {
      console.error("Error marking order as completed:", error);
    } finally {
      stopLoading();
    }
  };

  // useEffect(() => {
  //   const fetchAllOrders = async () => {
  //     try {
  //       startLoading();
  //       const response = await FetchData("dashboard/all-orders", "get");
  //       setAllOrders(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       stopLoading();
  //     }
  //   };

  //   fetchAllOrders();
  // }, []);

  const countTotalItems = (order) => {
    order.products.map((product) => {});
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative mb-4 flex items-center justify-between">
        <div className="absolute -skew-x-12 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold px-6 py-2 -left-2 shadow-lg">
          All Orders
        </div>
      </div>

      <div className="h-[80vh]  overflow-y-scroll  mt-16 text-black bg-gradient-to-b from-white/95 to-white/80 rounded-lg overflow-hidden border border-white/10 shadow-2xl  ">
        <table className="w-full  ">
          <tbody className="">
            <AnimatePresence>
              {allOrders?.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative  cursor-pointer hover:bg-white/50 transition-colors hover:drop-shadow-2xl duration-150 ease-in-out border flex flex-wrap"
                  onClick={() =>
                    setHandlePopup((prev) => ({
                      ...prev,
                      [order._id]: !prev[order._id],
                    }))
                  }
                >
                  <td className="relative p-4 w-5 ">
                    <div className="flex items-center gap-2">
                      <span className="text-black font-bold">{index + 1}</span>
                    </div>
                  </td>
                  <td className="relative p-4 w-52 ">
                    <div className="flex items-center gap-2">
                      <span className="text-black text-lg font-bold">
                        {order?.user?.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 w-fit  ">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black text-sm font-medium">
                          Ordered on {formatDate(order.createdAt)}
                        </span>
                        <span className="text-black/40 text-xs">
                          Id: {order._id}
                        </span>
                      </div>
                    </div>
                  </td>
                  {order.address.pinCode && (
                    <td className="p-4 w-40 ">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-black text-sm">
                            {`${order?.address?.street}, ${order?.address?.city},`}
                            <br />
                            {`${order?.address?.country},  ${order?.address?.pinCode}`}
                          </span>
                        </div>
                      </div>
                    </td>
                  )}

                  <td className="p-4 ">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black text-sm">
                          {order?.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 ">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black font-medium">
                          {handlePopup[order._id] ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 w-64 ">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black font-medium">
                          {order?.status === ("completed" || "failed") ? (
                            <Button className={"text-sm cursor-not-allowed"}>
                              {order?.status}
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleMarkCompleted(order._id)}
                                className={"text-sm"}
                              >
                                Mark as completed
                              </Button>
                              <Button
                                // onClick={() => handleMarkCompleted(order._id)}
                                className={"text-xs "}
                              >
                                Cancel Order
                              </Button>
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  {handlePopup[order._id] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mx-20 w-full  border "
                    >
                      <div className="flex flex-col gap-2">
                        {order.products.map((product) => (
                          <div
                            key={product._id}
                            className="grid grid-cols-4 grid-rows-1 gap-4"
                          >
                            <div className="flex flex-col">
                              <img
                                src={product?.productId?.images[0]?.url}
                                alt="Product"
                                className="w-20"
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <span className="text-black font-medium">
                                  {product?.productId?.name}
                                </span>
                                <span className="text-black/40 text-xs">
                                  Id: {product?.productId?._id}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <span className="text-black font-medium">
                                  {product?.productId?.price.currentPrice}
                                </span>
                                <span className="text-black/40 text-xs">
                                  Qt: {product?.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* {handlePopup.allCategoryPopup && (
        <div className="backdrop-blur-3xl absolute top-0 h-full w-full left-0 px-10 py-5">
          <Button
            label={<X />}
            onClick={() =>
              setHandlePopup((prev) => {
                return { ...prev, allCategoryPopup: false };
              })
            }
          />
          {AllCategories.map((category) => (
            <div key={category._id} className="p-4 rounded ">
              <div className="flex justify-between items-center bg-white p-2 rounded-xl ">
                <div>
                  <h2 className="text-sm font-semibold">
                    Main category:{" "}
                    <span className="text-xl">{category.title}</span>
                  </h2>
                  <p className="text-gray-600">Category ID: {category._id}</p>
                </div>

                <Button
                  label={<ChevronDown />}
                  onClick={() =>
                    setHandlePopup((prev) => ({
                      ...prev,
                      [category._id]: !prev[category._id],
                    }))
                  }
                />
              </div>

              {handlePopup[category._id] && (
                <div className="mt-3 bg-white p-4 rounded-xl">
                  {category.subcategories.length > 0 ? (
                    <>
                      <h3 className="font-medium">Subcategories:</h3>
                      <ul className="list-disc pl-5">
                        {category.subcategories.map((sub) => (
                          <li key={sub._id} className="text-gray-700">
                            {sub.title} (ID: {sub._id})
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-500">No subcategories available</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default LoadingUI(AdminAllOrders);
