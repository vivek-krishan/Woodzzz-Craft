import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Youtube, Facebook, Instagram, Twitter, Search } from "lucide-react";

const Header = () => {
  // Variables
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();
  const user = useSelector((store) => store.UserInfo.user);
  // const Cart = useSelector((store) => store.CartInfo.cart.cartItems);
  const dispatch = useDispatch();
  const buttonDesign = useRef("");

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

  return (
    <div key={"1111"} className="mt-5">
      <div className="Logo flex justify-evenly items-center" key={1113}>
        <Link to={"/"} className="LOGO " key={1112}>
          {/* <img src={Logo} alt="Logo" className="w-28" key={1114} /> */}
          <h1 className="font-serif font-semibold text-xl">Woodzzz Craft</h1>
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
          <div className="border border-black p-2 h-fit rounded-lg flex bg-[#000080] ">
            <button
              className="text-white"
                onClick={HandelRegister}
            >
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
              className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out "
            >
              Home
            </Link>
            <Link
              to={"/all-products"}
              className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out "
            >
              Collection
            </Link>
            <Link
              to={"/about"}
              className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out "
            >
              About us
            </Link>
            <Link
              to={"/cart"}
              className="font-light hover:font-medium hover:scale-110 transition duration-100 ease-in-out "
            >
              Cart
            </Link>
          </nav>
        </div>
        <div className="SearchBar flex items-center">
          <input
            className="bg-white rounded-md h-8"
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
          >
            <Search />
          </button>
        </div>
        <div className="SocialMedia w-1/6 flex justify-evenly m-3">
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
      </div>
    </div>
  );
};

export default Header;
