import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white p-5 mt-10 w-full flex flex-col lg:flex-row justify-evenly relative">
      <section className="logo flex flex-col justify-center items-center ">
        <img
          alt="team"
          className="w-16 h-16  object-cover object-center flex-shrink-0 rounded-full "
          src="https://ik.imagekit.io/woodzcraft/IMG_20250411_105210-removebg-preview.png?updatedAt=1744349111877"
        />
        <h1>Woodzzz Craft </h1>
        {/* <h3>@ 2023 Bundle Technologies Pvt. Ltd</h3> */}
      </section>
      <section className="Company flex flex-col lg:justify-start  items-center lg:items-start p-2 lg:p-0">
        <h2 className="lg:text-lg font-semibold cursor-default ">
          Handicraft manufacturer
        </h2>
        <div className="flex lg:flex-col flex-row justify-evenly items-center lg:items-start">
          <Link
            to="/"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Home
          </Link>
          <Link
            to="/all-products"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            All Products
          </Link>
          <Link
            to="/about"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            About
          </Link>
          <Link
            to="/about"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Team
          </Link>
        </div>
      </section>
      <section className="contact us flex flex-col lg:justify-start  items-center lg:items-start p-2 lg:p-0">
        <h2 className="text-lg font-semibold cursor-default">Contact us</h2>
        <div className="flex lg:flex-col flex-row justify-evenly items-center lg:items-start">
          <Link
            to="/error"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Help
          </Link>
          <Link
            to="/error"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Partners
          </Link>
        </div>
      </section>
      <section className="Delivery flex flex-col lg:justify-start  items-center lg:items-start p-2 lg:p-0">
        <h2 className="text-lg font-semibold cursor-default">We deliver to</h2>
        <div className="flex lg:flex-col flex-row justify-evenly items-center lg:items-start">
          <Link
            to="#"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Bangalore
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Gurgaon
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Hyderabad
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Delhi
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Mumbai
          </Link>
          <h3 className="m-2 text-xs font-base hidden lg:block">
            and many more cities
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Footer;
