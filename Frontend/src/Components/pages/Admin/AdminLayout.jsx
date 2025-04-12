import { Layers3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PopUp } from "./PopUp";
import { useSelector } from "react-redux";
import { FetchData } from "../../Utils/fetchFromAPI";
import { formatDate } from "../../Utils/FormatDateTime";

const AdminLayout = () => {
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
        const response = await FetchData("dashboard/all-orders", "get");
        setAllOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCounting = async () => {
      try {
        const response = await FetchData("dashboard/counting", "get");
        setCounting(() => {
          return {
            productCount: response.data.data.productsCount,
            userCount: response.data.data.usersCount,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllOrders();
    fetchCounting();
  }, []);

  // UI components
  const StampCard = ({ icon, title, counting }) => {
    return (
      <div className="bg-[#386641] flex lg:w-80 w-full p-2 justify-evenly rounded-2xl hover:-translate-y-2 duration-300 ease-in-out hover:drop-shadow-2xl hover:shadow-md z-10">
        <div className="flex flex-col p-5 justify-center items-center  w-1/4 ">
          {icon}
        </div>
        <div className="flex flex-col justify-center items-end pr-10 p-2 text-white w-3/4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-lg">{counting}</p>
        </div>
      </div>
    );
  };

  const OrderTable = ({ OrderId, Name, Product, Status, OrderDate }) => {
    return (
      <div className="overflow-auto w-full z-10">
        <table className="w-full text-left text-sm lg:rounded-t-2xl shadow-md bg-Lgreen p-3">
          <thead>
            <tr className="text-gray-600 text-2xl select-none">
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Customer Name
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Product
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Address
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">Date</th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Status
              </th>
            </tr>
          </thead>

          {console.log(allOrders)}
          {allOrders?.map((item, index) => (
            <tbody key={index} className="text-white">
              <tr>
                <td className="p-2 text-lg border-r border-l">
                  {item?.user.fullName}
                </td>
                <td className="p-2 text-lg border-r border-l">
                  {item?.products[0].productId.name}
                </td>
                <td className="p-2 text-lg border-r border-l px-10">
                  {`${item?.user.address[0].street}, ${item?.user.address[0].city}, ${item?.user.address[0].country},  ${item?.user.address[0].pinCode}`}
                </td>
                <td className="p-2 text-lg border-r border-l">
                  {formatDate(item?.createdAt)}
                </td>
                <td className="p-2 text-lg border-r border-l">
                  {item?.status}
                </td>
              </tr>
            </tbody>
          ))}
          {/* <tbody className="text-white">
            <tr>
              <td className="p-2 text-lg border-r border-l px-10">{OrderId}</td>
              <td className="p-2 text-lg border-r border-l">{Name}</td>
              <td className="p-2 text-lg border-r border-l">{Product}</td>
              <td className="p-2 text-lg border-r border-l">{Status}</td>
              <td className="p-2 text-lg border-r border-l">{OrderDate}</td>
            </tr>
          </tbody> */}
        </table>
      </div>
    );
  };

  return (
    user?.[0]?.admin && (
      <div className="">
        <section className="w-full flex justify-center items-center py-5">
          <button
            className="py-3 px-5 rounded-2xl text-white bg-[#386641] hover:scale-110 duration-200 ease-in-out z-10 "
            onClick={() => setShowPopup(true)}
          >
            Add New Product
          </button>

          {showPopup && <PopUp onClose={() => setShowPopup(false)} />}
        </section>

        <section className="p-5 lg:flex lg:justify-evenly w-full flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-2 ">
          <StampCard
            icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
            title={"Total Orders"}
            counting={allOrders.length}
          />
          <StampCard
            icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
            title={"Total Users"}
            counting={counting.userCount}
          />
          <StampCard
            icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
            title={"Total Products"}
            counting={counting.productCount}
          />
        </section>
        <section className="lg:px-36 lg:py-10 w-full p-5 flex justify-center items-center lg:w-full">
          <OrderTable />
        </section>
      </div>
    )
  );
};

export default AdminLayout;
