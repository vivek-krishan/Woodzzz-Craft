import CheckBox from "./CheckBox";
import Banner from "../../Genral purpose/Banner";

const AllProducts = ({ data }) => {
  return (
    <div className="flex justify-evenly h-fit mt-10">
      <section className="Navbar relative  w-1/4 mr-10">
        <div className="Sort bg-gray-200 w-full h-[15vh] rounded-xl flex justify-evenly items-center">
          <select className="w-2/3 h-10 rounded-xl cursor-pointer bg-transparent border">
            <option value={""}>Choose the Option</option>
            <option value={"Relevence"}>Relevence</option>
            <option value={"Price-lh"}>Price: Low-High</option>
            <option value={"Price-hl"}>Price: High-Low</option>
            <option value={"Popularity"}>Popularity</option>
            <option value={"Newest First"}>Newest First</option>
          </select>
          <button className="bg-gray-600 px-2 py-1 rounded-lg hover:scale-105 hover:shadow-2xl transition duration-200">
            sort
          </button>
        </div>
        <div className="Filter bg-gray-200 w-full h-[60vh] rounded-2xl z-50">
          <div className="Container w-fit h-full ml-10 my-5 p-10 overflow-y-scroll no-scrollbar ">
            <CheckBox />
          </div>
        </div>
        {/* <div className="bg-red-400 blur-xl opacity-50 absolute w-full h-full top-0 z-0"></div> */}
      </section>
      <section className="Products w-3/5 h-fit ml-10 ">
        <div className="Recommendation">
          <div className="grid grid-cols-4 m-5">
            <Banner
              images={40}
              start={0}
              details={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
