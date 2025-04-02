import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Search,
  AlignLeft,
  X,
} from "lucide-react";
import { alertError, alertInfo } from "../Utils/Alert";
import { clearUser } from "../Utils/Slices/UserInfoSlice";
import Logo from "../../../public/Logo.png"

const Header = () => {
  // Variables
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const [showHamburger, setShowHamburger] = useState(false);
  const user = useSelector((store) => store.UserInfo.user);

  // console.log(window.location.pathname);

  // console.log(user);
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  // functions
  const HandelSubmit = (e) => {
    if (searchText) {
      navigate(`/search/${searchText}`);
      setSearchText("");
    }
  };

  const HandelRegister = () => {
    navigate(`/authentication`);
  };

  const Hamburger = ({ onClose }) => {
    const modelRef = useRef();

    const closeModel = (e) => {
      if (modelRef.current === e.target) {
        onClose();
      }
    };

    return (
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 flex  w-[50vw] h-60 z-50  bg-white backdrop-blur-3xl rounded-r-xl overflow-hidden  "
      >
        <div className="flex flex-col  w-full  ">
          <div className="h-248 flex justify-between p-6 gap-2">
            <div className="">
              <h1 className="text-xl font-serif font-semibold">Menu</h1>
            </div>
            <div>
              <button className="" onClick={onClose}>
                <X size={30} />
              </button>
            </div>
          </div>

          <section className="menu-section flex flex-col">
            <Link to={"/"} onClick={onClose} className=" font-Exo my-1 mx-2  ">
              Home
            </Link>
            <Link
              to="/all-products"
              onClick={onClose}
              className=" font-Exo my-1 mx-2  "
            >
              Collection
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className=" font-Exo my-1 mx-2  "
            >
              About us
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className=" font-Exo my-1 mx-2  "
            >
              Cart
            </Link>

            {user != null && user[0]?.admin && (
              <Link
                to={"/admin"}
                onClick={onClose}
                className=" font-Exo my-1 mx-2  "
              >
                Admin
              </Link>
            )}
            <Link to={"#"} onClick={onClose} className=" font-Exo my-1 mx-2  ">
              Support
            </Link>
          </section>
        </div>
      </div>
    );
  };

  return (
    <div key={"1111"} className="lg:mt-5">
      <div className="Logo flex justify-between items-center  " key={1113}>
        <div className="Hamburger ml-2 laptop:hidden">
          <button
            className="laptop:hidden mobile:block"
            onClick={() => setShowHamburger(true)}
          >
            <AlignLeft
              size={25}
              className="m-1 group-hover:text-black text-black lg:hidden font-light"
            />
          </button>

          {showHamburger && (
            <Hamburger
              onClose={() => {
                setShowHamburger(false);
              }}
            />
          )}
        </div>

        <Link to={"/"} className="LOGO mx-10 lg:mx-40 flex justify-center items-center " key={1112}>
          <img src={Logo} alt="Logo" className="w-20" key={1114} />
          <h1 className=" font-[700] text-xl lg:text-3xl txt-green font-Caveat">
            <span className="txt-orange"> Woodzzz</span> Craft
          </h1>
        </Link>
        {user != null ? (
          <div className="lg:p-3 lg:px-4 h-20 m-2 lg:mx-20 rounded-full flex flex-col items-center justify-center  drop-shadow-lg  hover:scale-110 hover:drop-shadow-2xl transition duration-200 ease-in-out  ">
            <h1 className="font-thin text-sm text-white cursor-default">
              Hello{" "}
              <span className="lg:text-2xl text-lg txt-green font-Caveat font-bold">
                {user[0]?.fullName}
              </span>
            </h1>
            <button
              className="bg-green px-3 rounded-lg text-white hover:bg-Lgreen transition duration-200 ease-in-out text-sm lg:text-lg"
              onClick={() => {
                Dispatch(clearUser());
                alertInfo("you are logged Out! Please log in");
                navigate("/authentication");
                localStorage.clear();
              }}
            >
              LogOut
            </button>
          </div>
        ) : (
          // <div className="lg:p-3 lg:px-4 px-2 py-1  h-fit m-2 mx-20 rounded-full flex bg-green drop-shadow-lg  hover:scale-110 hover:drop-shadow-2xl hover:bg-Lgreen transition duration-200 ease-in-out  border-2 border-black">
          //   <button
          //     className="text-white text-xs lg:text-base"
          //     onClick={HandelRegister}
          //   >
          //     <span> Sign Up/ Sign In</span>
          //   </button>
          // </div>
          <div className="w-fit h-10 px-4 py-1 lg:mx-20 m-4 rounded-xl drop-shadow-lg bg-green flex justify-center items-center  hover:scale-110 hover:drop-shadow-2xl hover:bg-Lgreen transition duration-200 ease-in-out">
            <button
              className="text-white text-xs lg:text-base"
              onClick={HandelRegister}
            >
              Sign in
            </button>
          </div>
        )}
      </div>

      <div className=" w-full flex justify-evenly ">
        <div className="Navigation w-1/2 hidden lg:flex">
          <nav className="w-full flex justify-evenly items-center">
            <Link
              to={"/"}
              className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out ${
                location.pathname === "/" ? "underline" : ""
              }`}
            >
              <span
                className={`${location.pathname === "/" ? "txt-orange" : ""}`}
              >
                Home
              </span>
            </Link>
            <Link
              to={"/all-products"}
              className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out ${
                location.pathname === "/all-products" ? "underline" : ""
              }`}
            >
              <span
                className={`${
                  location.pathname === "/all-products" ? "txt-orange" : ""
                }`}
              >
                Collection
              </span>
            </Link>
            <Link
              to={"/about"}
              className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out ${
                location.pathname === "/about" ? "underline" : ""
              }`}
            >
              <span
                className={`${
                  location.pathname === "/about" ? "txt-orange" : ""
                }`}
              >
                About us
              </span>
            </Link>
            <Link
              to={"/cart"}
              className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out ${
                location.pathname === "/cart" ? "underline" : ""
              }`}
            >
              <span
                className={`${
                  location.pathname === "/cart" ? "txt-orange" : ""
                }`}
              >
                Cart
              </span>
            </Link>

            {user != null && user[0]?.admin && (
              <Link
                to={"/admin"}
                className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out ${
                  location.pathname === "/admin" ? "underline" : ""
                }`}
              >
                <span
                  className={`${
                    location.pathname === "/admin" ? "txt-orange" : ""
                  }`}
                >
                  Admin
                </span>
              </Link>
            )}
          </nav>
        </div>
        <div className="Search-bar p-2 rounded-full border-b-2 border-black  relative color">
          <button className="absolute left-0 top-1/2 -translate-y-1/2">
            <Search width={20} />
          </button>

          <input
            type="text"
            placeholder="Type to search..."
            className="placeholder:text-gray-700 w-full bg-transparent pl-9 pr-4 text-black focus:outline-none  xl:w-125"
          />
        </div>

        <div className="SocialMedia w-1/6 justify-evenly mx-3 hidden lg:flex">
          <Link
            to={""}
            className="hover:scale-110 transition duration-100 ease-in-out"
          >
            <Facebook />
          </Link>
          <Link
            to={""}
            className="hover:scale-110 transition duration-100 ease-in-out"
          >
            <Twitter />
          </Link>
          <Link
            to={""}
            className="hover:scale-110 transition duration-100 ease-in-out"
          >
            <Instagram />
          </Link>
          <Link
            to={""}
            className="hover:scale-110 transition duration-100 ease-in-out"
          >
            <Youtube />
          </Link>
        </div>

        {/* Hamburger for Smaller devices */}
      </div>
    </div>
  );
};

export default Header;
