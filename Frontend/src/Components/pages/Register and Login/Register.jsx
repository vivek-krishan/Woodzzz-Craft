import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { alertError, alertInfo } from "../../Utils/Alert";
import { addUser, clearUser } from "../../Utils/Slices/UserInfoSlice";
import { FetchData } from "../../Utils/fetchFromAPI";
import PopUp from "../../Genral purpose/PopUpWrapper";
import Button from "../../Genral purpose/Buttons";
import LoadingUI from "../../Genral purpose/Loading";
import { parseErrorMessage } from "../../Utils/ErrorMessageParser";

const Register = ({ startLoading, stopLoading }) => {
  // All Variables declaration for this components
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const formRef = useRef();
  const user = useSelector((store) => store.UserInfo.user);
  const [popup, setPopup] = useState(false);
  const changePasswordRef = useRef(null);
  console.log(user);

  // All function definition for this components
  const handleRegister = async () => {
    const formData = new FormData(formRef.current);

    try {
      startLoading();
      const response = await FetchData("user/register", "post", formData);
      console.log(response.data);
      // Storing the tokens into browser's local storage
      localStorage.setItem("AccessToken", response.data.data.AccessToken);
      localStorage.setItem("RefreshToken", response.data.data.RefreshToken);

      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.User));

      alertInfo(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(changePasswordRef.current);

    try {
      startLoading();
      const response = await FetchData(
        "user/change-password",
        "post",
        formData
      );
      console.log(response);
      alertInfo(response.data.message);
      setPopup(false);
    } catch (error) {
      console.log(error);
      alertError(parseErrorMessage(error.response.data));
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="text-black flex justify-center w-full h-fit  ">
      {user ? (
        <div className="font-Caveat lg:w-3/4 w-4/5 lg:my-20 h-full flex flex-col gap-10 py-5">
          <h1 className=" text-4xl text-center">
            Hello{" "}
            <span className="text-[#EB5A2A] font-bold">
              {user[0]?.fullName}
            </span>
          </h1>
          <h1 className="lg:text-3xl text-xl">
            Tap on the change password button to change your registered password
          </h1>
          <button
            onClick={() => setPopup(true)}
            className=" bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105 font-sans"
          >
            Change password
          </button>
          {popup && (
            <PopUp onClose={() => setPopup(false)}>
              <h2>Change Password</h2>
              <form
                ref={changePasswordRef}
                onSubmit={handleChangePassword}
                className="Form w-[40vw] p-2  flex flex-col justify-center items-center bg-white rounded-xl font-sans"
              >
                <div className="UserName w-72 m-5">
                  <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
                    Email
                  </label>
                  <input
                    type="text"
                    className="bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="Old-password w-72 m-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg w-fit font-serif txt-Gray"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    placeholder="Old Password"
                    name="oldPassword"
                    required
                  />
                </div>
                <div className="password w-72 m-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg w-fit font-serif txt-Gray"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    className="bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    placeholder="New Password"
                    name="newPassword"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-L"
                >
                  Submit
                </Button>
              </form>
            </PopUp>
          )}
        </div>
      ) : (
        <div>
          <section className="Form_side  w-full ">
            {/* <div className="Google_signIn m-auto mt-10 px-3 w-fit text-black flex justify-center items-center rounded-full  border-b-2 border-l-2 border-white/30 bg-white drop-shadow-xl  hover:scale-110 hover:drop-shadow-2xl transition duration-150 ease-in-out cursor-pointer">
          <h3 className="font-medium text-center ">Register with google </h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-7 m-2"
          />
        </div> */}
            <form
              ref={formRef}
              className="Form flex flex-wrap justify-center m-5 bg-black/30 rounded-xl py-10 "
            >
              <div className="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2 gap-4 w-full lg:mx-10   ">
                <input
                  type="text"
                  className="bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                  placeholder="Enter Your full name"
                  name="fullName"
                  required
                />

                <input
                  type="email"
                  className="lg:col-span-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                  placeholder="Your Email"
                  name="email"
                  required
                />

                <input
                  type="number"
                  className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                  placeholder="Contact Number"
                  name="phone"
                  required
                />

                <input
                  type="number"
                  className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                  placeholder="Age"
                  name="age"
                  required
                />

                <input
                  type="password"
                  className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                  placeholder="Password"
                  name="passkey"
                  required
                />
              </div>
              <div className="Address w-full  lg:mx-10">
                <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
                  Address
                </label>
                <div className=" grid lg:grid-cols-4 grid-cols-1 lg:grid-rows-2 gap-4 w-full  ">
                  <input
                    type="text"
                    className="lg:col-span-4 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    name="street"
                    placeholder="Street"
                    required
                  />
                  <input
                    type="text"
                    className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    name="city"
                    placeholder="city"
                    required
                  />
                  <input
                    type="text"
                    className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    name="state"
                    placeholder="state"
                    required
                  />
                  <input
                    type="text"
                    className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                    name="country"
                    placeholder="country"
                    required
                  />
                  <input
                    type="number"
                    className="lg:row-start-2 bg-white border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black"
                    name="pinCode"
                    placeholder="Pin Code"
                    required
                  />
                </div>
              </div>
            </form>

            <div className="Register-btn flex justify-center m-10">
              <button
                onClick={handleRegister}
                className=" bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
              >
                Register
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default LoadingUI(Register);
