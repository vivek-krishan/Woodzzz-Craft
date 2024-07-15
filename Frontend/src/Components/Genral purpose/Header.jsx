import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Search,
  AlignJustify,
} from "lucide-react";

const Header = () => {
  // Variables
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();
  const user = useSelector((store) => store.UserInfo.user);
  // const Cart = useSelector((store) => store.CartInfo.cart.cartItems);
  const dispatch = useDispatch();
  const buttonDesign = useRef("");

  const [activeMenu, setActiveMenu] = useState(false);

  // functions
  const HandelSubmit = (e) => {
    if (searchText) {
      navigate(`/search/${searchText}`);
      setSearchText("");
    }
  };

  const HandelRegister = () => {
    navigate(`/register`);
  };

  const HandelLogOut = async () => {
    await fetch("http://localhost:3000/logout");
    dispatch(clearUser());
    console.log(user);
    navigate(`/`);
  };

  const setMenuVisible = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div key={"1111"} className="mt-5">
      <div className="Logo flex justify-between items-center" key={1113}>
        <Link to={"/"} className="LOGO mx-40" key={1112}>
          {/* <img src={Logo} alt="Logo" className="w-28" key={1114} /> */}
          <h1 className=" font-[700] text-3xl txt-green font-Caveat">
            Woodzzz Craft
          </h1>
        </Link>
        {user != null ? (
          <div className="flex flex-col">
            <h1 className="font-thin text-lg">
              Hello {user[0]?.user?.username}{" "}
            </h1>
            <button
              className="bg-gray-200 px-3 rounded-lg hover:bg-gray-500 hover:text-white transition duration-200 ease-in-out"
              onClick={HandelLogOut}
            >
              LogOut
            </button>
          </div>
        ) : (
          <div className="p-3 px-4 h-fit m-2 mx-20 rounded-full flex bg-green drop-shadow-lg  hover:scale-110 hover:drop-shadow-2xl hover:bg-Lgreen transition duration-200 ease-in-out">
            <button className="text-white" onClick={HandelRegister}>
              Sign Up/ Sign In
            </button>
          </div>
        )}
      </div>
      <div className=" w-full flex justify-evenly ">
        <div className="Navigation w-1/2 flex">
          <nav className="w-full flex justify-evenly items-center">
            <Link
              to={"/"}
              className="font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out "
            >
              Home
            </Link>
            <Link
              to={"/all-products"}
              className="font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out "
            >
              Collection
            </Link>
            <Link
              to={"/about"}
              className="font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out "
            >
              About us
            </Link>
            <Link
              to={"/cart"}
              className="font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out "
            >
              Cart
            </Link>
          </nav>
        </div>
        <div className="SearchBar relative flex items-center">
          <input
            className="bg-transparent border border-gray-500 rounded-full h-8 w-60 p-2 "
            placeholder="Search"
            value={searchText}
            name={"searchBar"}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onSubmit={HandelSubmit}
          />
          <button
            onClick={() => {
              HandelSubmit();
            }}
            className="relative -left-7"
          >
            <Search width={20} />
          </button>
        </div>
        <div className="SocialMedia w-1/6 flex justify-evenly mx-3">
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
        <div className="Hamburger md:hidden flex flex-col items-end">
          <button onClick={setMenuVisible}>
            <AlignJustify />
          </button>
          {activeMenu && (
            <div className="HamBurgerContent w-[10vw] h-fit bg-gray-400 bg-opacity-30 rounded-xl">
              <nav className="w-full flex flex-col justify-evenly items-center">
                <Link
                  to={"/"}
                  className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out p-2 "
                >
                  Home
                </Link>
                <Link
                  to={"/all-products"}
                  className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out p-2 "
                >
                  Collection
                </Link>
                <Link
                  to={"/about"}
                  className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out p-2 "
                >
                  About us
                </Link>
                <Link
                  to={"/cart"}
                  className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out p-2 "
                >
                  Cart
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
