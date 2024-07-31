import { Layers3 } from "lucide-react";
import { useState } from "react";
import PopUp from "../../Utils/PopUp";

const AdminLayout = () => {
  const StampCard = ({ icon, title, variable }) => {
    return (
      <div className="bg-[#386641] flex lg:w-80 w-full p-2 justify-evenly rounded-2xl hover:-translate-y-2 duration-300 ease-in-out hover:drop-shadow-2xl hover:shadow-md">
        <div className="flex flex-col p-5 justify-center items-center  w-1/4 ">
          {icon}
        </div>
        <div className="flex flex-col justify-center items-end pr-10 p-2 text-white w-3/4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-lg">{variable}</p>
        </div>
      </div>
    );
  };

  const OrderTable = ({ OrderId, Name, Product, Status, OrderDate }) => {
    return (
      <div className="overflow-auto w-full">
        <table className="w-full text-left text-sm lg:rounded-t-2xl shadow-md bg-[#386641] p-3">
          <thead>
            <tr className="text-gray-600 text-2xl select-none">
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Order ID
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Customer Name
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Product
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">
                Status
              </th>
              <th className="p-2 border-b border-[#D2B48C] text-white">Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr>
              <td className="p-2 text-lg border-r border-l px-10">{OrderId}</td>
              <td className="p-2 text-lg border-r border-l">{Name}</td>
              <td className="p-2 text-lg border-r border-l">{Product}</td>
              <td className="p-2 text-lg border-r border-l">{Status}</td>
              <td className="p-2 text-lg border-r border-l">{OrderDate}</td>
            </tr>
            <tr>
              <td className="p-2 text-lg border-r border-l px-10">{OrderId}</td>
              <td className="p-2 text-lg border-r border-l">{Name}</td>
              <td className="p-2 text-lg border-r border-l">{Product}</td>
              <td className="p-2 text-lg border-r border-l">{Status}</td>
              <td className="p-2 text-lg border-r border-l">{OrderDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="">
      <section className="w-full flex justify-center items-center py-5">
        <button
          className="py-3 px-5 rounded-2xl text-white bg-[#386641] hover:scale-110 duration-200 ease-in-out"
          onClick={() => setShowPopup(true)}
        >
          Add New Product
        </button>

        {showPopup && <PopUp onClose={() => setShowPopup(false)} />}
      </section>

      <section className="p-5 lg:flex lg:justify-evenly w-full flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-2 ">
        <StampCard
          icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
          title={"Orders"}
          variable={"5000"}
        />
        <StampCard
          icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
          title={"Recent Orders"}
          variable={"5000"}
        />
        <StampCard
          icon={<Layers3 className="w-14 h-14 text-white drop-shadow-2xl" />}
          title={"New Customers"}
          variable={"5000"}
        />
      </section>
      <section className="lg:px-36 lg:py-10 w-full p-5 flex justify-center items-center lg:w-full">
        <OrderTable
          Name={"Kshitij"}
          OrderDate={"30/07/24"}
          OrderId={"01"}
          Product={"Door"}
          Status={"Delivered"}
        />
      </section>
    </div>
  );
};

export default AdminLayout;
