import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white p-5 mt-10 w-[99vw] flex flex-col lg:flex-row justify-evenly relative">
      <section className="logo flex flex-col justify-center items-center ">
        {/* <img src={Logo} alt="Logo" className="w-28 filter invert" /> */}
        <h1>Woodzzz Craft </h1>
        <h3>@ 2023 Bundle Technologies Pvt. Ltd</h3>
      </section>
      <section className="Company flex flex-col lg:justify-start  items-center lg:items-start p-2 lg:p-0">
        <h2 className="text-lg font-semibold cursor-default ">Company</h2>
        <div className="flex lg:flex-col flex-row justify-evenly items-center lg:items-start">
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            About
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Team
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Careers
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Mall One
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Mall Instamart
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Mall Genie
          </Link>
        </div>
      </section>
      <section className="contact us flex flex-col lg:justify-start  items-center lg:items-start p-2 lg:p-0">
        <h2 className="text-lg font-semibold cursor-default">Contact us</h2>
        <div className="flex lg:flex-col flex-row justify-evenly items-center lg:items-start">
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Help
          </Link>
          <Link
            to="#"
            className="lg:m-2 m-1 border-b text-sm font-extralight px-1 lg:border-0"
          >
            Partners
          </Link>
          <Link
            to="/admin"
            className="lg:m-2 m-1 border-b lg:border-0 text-sm font-extralight px-1"
          >
            Admin
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
