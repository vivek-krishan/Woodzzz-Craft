import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Search,
  AlignLeft,
  X,
  Heart,
  Pen,
  Home,
  ShoppingCart,
  ListCollapse,
  Package,
  Pencil,
  Store,
  List,
  User,
} from "lucide-react";
import { alertInfo } from "../Utils/Alert";
import { clearUser } from "../Utils/Slices/UserInfoSlice";
import Logo from "/Logo.png";
import PopUp from "./PopUpWrapper";
import { FetchData } from "../Utils/fetchFromAPI";
import { ProductCardAI } from "./product-card";
import { addWishlist, setWishlist } from "../Utils/Slices/WishListSlice";
import { motion } from "framer-motion";
import { RiFacebookCircleFill, RiInstagramFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";

const HamburgerMenu = ({ onClose }) => {
  const modelRef = useRef();
  const location = useLocation();
  const user = useSelector((store) => store.UserInfo.user);
  const navItems = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/all-products", label: "Collection", icon: <Package /> },
    { path: "/about", label: "About us", icon: <ListCollapse /> },
    { path: "/cart", label: "Cart", icon: <ShoppingCart /> },
    { path: "/authentication", label: "Edit Password", icon: <Pen /> },
    ...(user?.[0]?.admin
      ? [{ path: "/admin", label: "Admin", icon: <User /> }]
      : []),
    // { path: "#", label: "Wishlist" },
  ];

  const handleClickOutside = (e) => {
    if (modelRef.current === e.target) onClose();
  };
  const handleAuthentication = () => {
    navigate("/authentication");
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 120 }}
      ref={modelRef}
      onClick={handleClickOutside}
      className="fixed inset-0 flex h-screen z-50 bg-white backdrop-blur-3xl overflow-hidden"
    >
      <div className="flex flex-col w-full">
        <div className="h-248 flex justify-between p-6 gap-2">
          <h1 className="text-3xl font-Caveat font-semibold">Menu</h1>
          <button onClick={onClose}>
            <X size={30} />
          </button>
        </div>
        <section className="menu-section flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`font-Exo border border-[#EB5A2A]  my-1 mx-2 py-2 px-2 rounded-full w-3/4 flex justify-start items-center gap-5 ${
                location.pathname === item.path
                  ? "bg-[#EB5A2A] shadow-2xl text-white"
                  : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </section>
        {/* <span>
          <button
            className="bg-green px-2 py-1 rounded-lg text-white hover:bg-Lgreen transition duration-200 ease-in-out text-xs lg:text-base flex justify-center items-center lg:gap-1"
            onClick={handleAuthentication}
          >
            <Pen className="lg:h-5 h-4" />
            Password
          </button>
        </span> */}
      </div>
    </motion.div>
  );
};

const NavLink = ({ to, label, currentPath }) => (
  <Link
    to={to}
    className={`font-bold txt-green drop-shadow-xl hover:drop-shadow-2xl hover:scale-110 transition duration-100 ease-in-out ${
      currentPath === to ? "underline" : ""
    }`}
  >
    <span className={currentPath === to ? "txt-orange" : ""}>{label}</span>
  </Link>
);

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [showHamburger, setShowHamburger] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  // const [wishList, setWishList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.UserInfo.user);
  const wishList = useSelector((store) => store.WishList.wishlist);

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await FetchData("carts/wishlist/", "get");
      response.data.data.map((item) =>
        dispatch(addWishlist(item.likedProduct))
      );
      // setWishList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleSearch = useCallback(() => {
    if (searchText) navigate(`/search/${searchText}`);
  }, [searchText, navigate]);

  const handleKeyDown = useCallback(
    (e) => e.key === "Enter" && handleSearch(),
    [handleSearch]
  );

  const handleAuthentication = () => {
    navigate("/authentication");
  };

  // const handleLogout = (() => {
  //   dispatch(clearUser());
  //   localStorage.removeItem("AccessToken");
  //   localStorage.removeItem("RefreshToken");
  //   alertInfo("You are logged out! Please log in");
  //   navigate("/authentication");
  //   localStorage.clear();
  // });

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
    alertInfo("You are logged out! Please log in");
    navigate("/authentication");
    localStorage.clear();
  }, [dispatch, navigate]);

  const navItems = [
    {
      path: "/",
      label: (
        <h1 className="flex justify-center items-center gap-1">
          <Home />
          Home
        </h1>
      ),
    },
    {
      path: "/all-products",
      label: (
        <h1 className="flex justify-center items-center gap-1">
          <List />
          Collections
        </h1>
      ),
    },
    {
      path: "/about",
      label: (
        <h1 className="flex justify-center items-center gap-1">
          <Store />
          About us
        </h1>
      ),
    },
    {
      path: "/cart",
      label: (
        <h1 className="flex justify-center items-center gap-1">
          <ShoppingCart />
          Cart
        </h1>
      ),
    },
    {
      path: "/authentication",
      label: (
        <h1 className="flex justify-center items-center gap-1">
          <Pencil /> Edit Password
        </h1>
      ),
    },
    ...(user?.[0]?.admin
      ? [
          {
            path: "/admin",
            label: (
              <h1 className="flex justify-center items-center gap-1">
                <User /> Admin
              </h1>
            ),
          },
        ]
      : []),
  ];

  const socialLinks = [
    {
      icon: <RiFacebookCircleFill className="text-3xl text-blue-500" />,
      url: "https://www.facebook.com/share/1A8VoVe2Ko/",
    },
    {
      icon: <FaPinterest className="text-3xl text-red-500" />,
      url: "https://pin.it/1wy5DS6DE",
    },
    {
      icon: <RiInstagramFill className="text-3xl text-pink-500" />,
      url: "https://www.instagram.com/WOODZZZCRAFT",
    },
  ];

  return (
    <div className="lg:pt-5 bg-[#FEFFFF] relative z-50">
      {/* Mobile Hamburger */}
      <div className="Hamburger ml-2 laptop:hidden absolute">
        <button
          className="laptop:hidden mobile:block"
          onClick={() => setShowHamburger(true)}
        >
          <AlignLeft size={25} className="m-1 text-black lg:hidden" />
        </button>
        {showHamburger && (
          <HamburgerMenu onClose={() => setShowHamburger(false)} />
        )}
      </div>

      {/* Logo and User Section */}
      <div className="Logo flex justify-between items-center">
        <Link
          to="/"
          className="LOGO mx-10 lg:mx-20 flex justify-center items-center"
        >
          <img src={Logo} alt="Logo" className="w-11" />
          <h1 className="font-[700] text-xl lg:text-3xl txt-green font-Caveat">
            <span className="txt-orange"> Woodzzz</span> Craft
          </h1>
        </Link>

        <div className="flex">
          {user && (
            <button
              onClick={() => setShowWishlist(true)}
              className="flex flex-col justify-center items-center"
            >
              <Heart fill="#f96635" color="#f96635" />
              <span className="text-xs">Wishlist</span>
            </button>
          )}

          {user ? (
            <div className="lg:p-3 lg:px-4 h-20 lg:m-2 lg:mr-20 rounded-full flex flex-col items-center justify-center drop-shadow-lg hover:scale-110 hover:drop-shadow-2xl transition duration-200 ease-in-out ">
              <h1 className="font-thin text-sm text-white cursor-default flex justify-center items-center gap-2">
                Hello{" "}
                <span className="lg:text-2xl text-lg truncate txt-green font-Caveat font-bold">
                  {user[0]?.fullName}
                </span>
                {/* <span>
                  <button
                    className="bg-green px-2 py-1 rounded-lg text-white hover:bg-Lgreen transition duration-200 ease-in-out text-xs lg:text-base flex justify-center items-center lg:gap-1"
                    onClick={handleAuthentication}
                  >
                    <Pen className="lg:h-5 h-4" />
                    Password
                  </button>
                </span> */}
              </h1>
              <button
                className="bg-green px-3 rounded-lg text-white hover:bg-Lgreen transition duration-200 ease-in-out text-sm lg:text-lg mt-2"
                onClick={handleLogout}
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="w-fit h-10 px-4 py-1 lg:mx-20 m-4 rounded-xl drop-shadow-lg bg-green flex justify-center items-center hover:scale-110 hover:drop-shadow-2xl hover:bg-Lgreen transition duration-200 ease-in-out">
              <button
                className="text-white text-xs lg:text-base"
                onClick={() => navigate("/authentication")}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Popup */}
      {showWishlist && (
        <PopUp onClose={() => setShowWishlist(false)}>
          <div className="bg-white w-[80vw] h-[80vh] rounded-xl drop-shadow-2xl overflow-y-scroll z-50">
            <h2 className="txt-orange text-3xl font-bold font-serif m-5">
              Your Wish List
            </h2>
            <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {wishList.length > 0 ? (
                wishList?.map((item) => (
                  <div key={item._id} className="lg:w-48 w-40">
                    <ProductCardAI product={item} />
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="txt-green">
                    You have no element in your wishlist!!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </PopUp>
      )}

      {/* Navigation Bar */}
      <div className="w-full flex justify-between items-center pb-5 shadow-xl rounded-xl ">
        {/* Desktop Navigation */}
        <div className="Navigation w-3/4 hidden lg:flex">
          <nav className="w-full flex justify-evenly items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                label={item.label}
                currentPath={location.pathname}
              />
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="Search-bar p-2 rounded-full border border-black relative color flex justify-center items-center gap-10 w-96">
          <button onClick={handleSearch}>
            <Search width={20} />
          </button>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="placeholder:text-gray-700 w-full bg-transparent text-black focus:outline-none xl:w-125"
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Social Media Links */}
        <div className="SocialMedia justify-evenly hidden lg:flex gap-5 px-3 ">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition duration-100 ease-in-out"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
