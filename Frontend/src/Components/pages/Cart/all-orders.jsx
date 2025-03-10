import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../Utils/FormatDateTime";
import { FetchData } from "../../Utils/fetchFromAPI";
import { ChevronDown, ChevronUp } from "lucide-react";

const AllOrdersList = [
  {
    _id: "67cbfbeee3fb67528c22e1af",
    user: "67cbf7ab469c3f0dc6c55d53",
    products: [
      {
        productId: "67b852604a22791cead0690f",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b0",
      },
      {
        productId: "67b852d64a22791cead06921",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b1",
      },
    ],
    totalPrice: 450,
    createdAt: "2025-03-08T08:12:30.412Z",
    updatedAt: "2025-03-08T08:12:30.412Z",
    __v: 0,
  },
  {
    _id: "67cbfbeee3fb67528c22e1af",
    user: "67cbf7ab469c3f0dc6c55d53",
    products: [
      {
        productId: "67b852604a22791cead0690f",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b0",
      },
      {
        productId: "67b852d64a22791cead06921",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b1",
      },
    ],
    totalPrice: 450,
    createdAt: "2025-03-08T08:12:30.412Z",
    updatedAt: "2025-03-08T08:12:30.412Z",
    __v: 0,
  },
  {
    _id: "67cbfbeee3fb67528c22e1af",
    user: "67cbf7ab469c3f0dc6c55d53",
    products: [
      {
        productId: "67b852604a22791cead0690f",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b0",
      },
      {
        productId: "67b852d64a22791cead06921",
        quantity: 1,
        _id: "67cbfbeee3fb67528c22e1b1",
      },
    ],
    totalPrice: 450,
    createdAt: "2025-03-08T08:12:30.412Z",
    updatedAt: "2025-03-08T08:12:30.412Z",
    __v: 0,
  },
];

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [handlePopup, setHandlePopup] = useState({});

  useEffect(() => {
    const FetchAllOrders = async () => {
      try {
        const response = await FetchData("orders/get-my-orders", "get");
        setAllOrders(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    FetchAllOrders();
  }, []);

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

      <div className="mt-16 text-black bg-gradient-to-b from-white/95 to-white/80 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
        <table className="w-full">
          <tbody>
            <AnimatePresence>
              {allOrders?.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative  cursor-pointer hover:bg-white/50 transition-colors hover:drop-shadow-2xl duration-150 ease-in-out border flex flex-wrap "
                  onClick={() =>
                    setHandlePopup((prev) => ({
                      ...prev,
                      [order._id]: !prev[order._id],
                    }))
                  }
                >
                  <td className="relative p-4 w-20">
                    <div className="flex items-center gap-2">
                      <span className="text-black font-bold">{index + 1}</span>
                    </div>
                  </td>
                  <td className="p-4 w-1/4 ">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black font-medium">
                          Ordered on {formatDate(order.createdAt)}
                        </span>
                        <span className="text-black/40 text-xs">
                          Id: {order._id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 w-1/4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-black font-medium">
                          Total Products {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 w-1/4">
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
                                src={product?.productId?.images[0]}
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
