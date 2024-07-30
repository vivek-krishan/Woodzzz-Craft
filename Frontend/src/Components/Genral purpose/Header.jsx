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
import { alertError, alertInfo } from "../Utils/Alert";
import { clearUser } from "../Utils/Slices/UserInfoSlice";

const Header = () => {
  // Variables
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState("home");
  const user = useSelector((store) => store.UserInfo.user);

  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState(false);

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

  const setMenuVisible = () => {
    setActiveMenu(!activeMenu);
  };

  const LogOutFn = async () => {
    try {
      // Retrieve tokens from local storage
      const refreshToken = localStorage.getItem("RefreshToken");
      const accessToken = localStorage.getItem("AccessToken");

      if (!refreshToken || !accessToken) {
        alertError("Tokens are missing from local storage");
        throw new Error("Tokens are missing from local storage");
      }

      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
        method: "POST",
        credentials: "include", // This will include cookies in the request
        body: JSON.stringify({}),
        redirect: "follow",
      };

      console.log(requestOptions);
      fetch("http://localhost:3000/api/v1/user/logout", requestOptions)
        .then((response) => {
          console.log(response);
          response.json();
        })
        .then((result) => {
          console.log(result);
          // Clearing data from redux store
          dispatch(clearUser());

          // Clear tokens from local storage
          // localStorage.removeItem("RefreshToken");
          localStorage.removeItem("AccessToken");

          alertInfo(result.message);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          alertError("Failed to log out. Please try again.");
        });
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
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
          <div className="p-3 px-4 h-20 m-2 mx-20 rounded-full flex flex-col items-center justify-center  drop-shadow-lg  hover:scale-110 hover:drop-shadow-2xl transition duration-200 ease-in-out ">
            <h1 className="font-thin text-sm text-white cursor-default">
              Hello{" "}
              <span className="text-2xl txt-green font-Caveat font-bold">
                {user[0]?.fullName}
              </span>
            </h1>
            <button
              className="bg-green px-3 rounded-lg text-white hover:bg-Lgreen transition duration-200 ease-in-out"
              onClick={LogOutFn}
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
            {user != null && user[0]?.admin && (
              <Link
                to={"/admin"}
                className="font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110  transition duration-100 ease-in-out "
              >
                Admin
              </Link>
            )}
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
