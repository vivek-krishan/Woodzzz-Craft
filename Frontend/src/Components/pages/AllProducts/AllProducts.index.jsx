import Banner from "../../Genral purpose/Banner";
// import { Products } from "../../Utils/productImg";
import { useSelector } from "react-redux";

const AllProducts = ({ data }) => {
  const Products = useSelector((store) => store.ProductsList.products);

  return (
    <div className="flex justify-evenly h-fit mt-10">
      {/* <section className="Navbar relative  w-1/4 mr-10">
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
      </section> */}
      <section className="Products lg:w-4/5 h-fit lg:ml-10 ">
        <div className="Recommendation">
          <div className="grid lg:grid-cols-5 lg:gap-24 lg:m-10 grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 md:m-10">
            <Banner
              images={Products.length}
              start={0}
              details={true}
              width={"10vw"}
              height={"20vh"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
