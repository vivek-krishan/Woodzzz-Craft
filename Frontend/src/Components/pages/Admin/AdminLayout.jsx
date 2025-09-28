import { Layers3, ShoppingBasket, ShoppingCart, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PopUp from "./PopUp";
import { useSelector } from "react-redux";
import { FetchData } from "../../Utils/fetchFromAPI";
import { formatDate } from "../../Utils/FormatDateTime";
import Button from "../../Genral purpose/Buttons";
import { alertSuccess } from "../../Utils/Alert";
import LoadingUI from "../../Genral purpose/Loading";
import AdminAllOrders from "./Admin-all-orders";

const AdminLayout = ({ startLoading, stopLoading }) => {
  // Variables
  const [showPopup, setShowPopup] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [counting, setCounting] = useState({
    productCount: 0,
    userCount: 0,
  });

  const user = useSelector((store) => store.UserInfo.user);

  // Utility functions
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        startLoading();
        const response = await FetchData("dashboard/all-orders", "get");
        setAllOrders(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };
    const fetchCounting = async () => {
      try {
        startLoading();
        const response = await FetchData("dashboard/counting", "get");
        setCounting(() => {
          return {
            productCount: response.data.data.productsCount,
            userCount: response.data.data.usersCount,
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };

    fetchAllOrders();
    fetchCounting();
  }, []);

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

  // UI components
  const StampCard = ({ icon, title, counting }) => {
    return (
      <div className='bg-white text-black shadow-lg flex lg:w-80 w-full p-2 justify-evenly rounded-2xl hover:-translate-y-2 duration-300 ease-in-out hover:drop-shadow-2xl hover:shadow-md z-10'>
        <div className='flex flex-col p-5 justify-center items-center  w-1/4 '>
          {icon}
        </div>
        <div className='flex flex-col justify-center items-end pr-10 p-2 w-3/4'>
          <h3 className='text-2xl font-semibold font-Caveat '>{title}</h3>
          <p className='text-lg'>{counting}</p>
        </div>
      </div>
    );
  };

  const OrderTable = () => {
    return (
      <div className=' w-full bg-gray-100  z-10 '>
        <div className='max-h-96 overflow-y-auto border border-gray-200 rounded-md'>
          <table className='min-w-full text-sm text-left'>
            <thead className='sticky top-0 bg-gray-300 text-gray-700 z-10'>
              <tr>
                <th className='px-4 py-3 border-b'>Customer Name</th>
                <th className='px-4 py-3 border-b'>Product ID</th>
                <th className='px-4 py-3 border-b'>Address</th>
                <th className='px-4 py-3 border-b'>Date</th>
                <th className='px-4 py-3 border-b'>Status</th>
                <th className='px-4 py-3 border-b'>Action</th>
              </tr>
            </thead>
            <tbody className='text-gray-700 z-0'>
             
              {allOrders?.map((item, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-4 py-2 border-b'>{item?.user?.fullName}</td>
                  <td className='px-4 py-2 border-b'>
                    <img
                      src={item?.products[0].productId?.images[0].url}
                      className='lg:w-20'
                      alt='No image available'
                    />
                  </td>
                  <td className='px-4 py-2 border-b'>
                    {" "}
                    {`${item?.user?.address[0].street}, ${item?.user?.address[0].city}, ${item?.user?.address[0].country},  ${item?.user?.address[0].pinCode}`}
                  </td>
                  <td className='px-4 py-2 border-b'>
                    {" "}
                    {formatDate(item?.createdAt)}
                  </td>
                  <td className='px-4 py-2 border-b'> {item?.status}</td>
                  <td className='px-4 py-2 border-b'>
                    {item?.status === "completed" ? null : (
                      <Button
                        onClick={() => handleMarkCompleted(item._id)}
                        className={"text-sm"}
                      >
                        Mark as completed
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    user?.[0]?.admin && (
      <div className=''>
        <section className='w-full flex justify-center items-center py-5'>
          {/* <button
            className="py-3 px-5 rounded-2xl text-white bg-[#386641] hover:scale-110 duration-200 ease-in-out z-10 "
            onClick={() => setShowPopup(true)}
          >
            Add New Product
          </button> */}
          <Button onClick={() => setShowPopup(true)}>Add new product</Button>

          {showPopup && <PopUp onClose={() => setShowPopup(false)} />}
        </section>

        <section className='p-5 lg:flex lg:justify-evenly w-full flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-2 '>
          <StampCard
            icon={
              <ShoppingCart className='w-14 h-14 txt-orange drop-shadow-2xl' />
            }
            title={"Total Orders"}
            counting={allOrders.length}
          />
          <StampCard
            icon={<Users className='w-14 h-14 txt-orange drop-shadow-2xl' />}
            title={"Total Users"}
            counting={counting.userCount}
          />
          <StampCard
            icon={
              <ShoppingBasket className='w-14 h-14 txt-orange drop-shadow-2xl' />
            }
            title={"Total Products"}
            counting={counting.productCount}
          />
        </section>
        <section className='lg:px-36 lg:py-10 w-full p-5 flex justify-center items-center lg:w-full'>
          {/* <OrderTable /> */}
          <AdminAllOrders allOrders={allOrders} />
        </section>
      </div>
    )
  );
};

export default LoadingUI(AdminLayout);
