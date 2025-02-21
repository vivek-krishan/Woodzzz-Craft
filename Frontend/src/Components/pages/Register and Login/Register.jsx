import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { alertError, alertInfo } from "../../Utils/Alert";
import { addUser, clearUser } from "../../Utils/Slices/UserInfoSlice";
import { FetchData } from "../../Utils/fetchFromAPI";

const Register = () => {
  // All Variables declaration for this components 
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const formRef = useRef();

  // All function definition for this components
  const Register = async () => {
    const formData = new FormData(formRef.current);

    try {
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
      alertError(error.message);
    }
  };

  return (
    <div className="text-black flex justify-center w-full h-fit  ">
      <section className="Form_side ">
        <div className="Google_signIn m-auto mt-10 px-3 w-fit text-black flex justify-center items-center rounded-full  border-b-2 border-l-2 border-white/30 bg-white/30 drop-shadow-xl  hover:scale-110 hover:drop-shadow-2xl transition duration-150 ease-in-out cursor-pointer">
          <h3 className="font-medium text-center ">Register with google </h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-7 m-2"
          />
        </div>

        <h1 className="text-center m-10 text-lg">--- Register ---</h1>

        <form ref={formRef} className="Form flex flex-wrap justify-center ">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full mx-10">
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black focus:outline-none focus:border-b-2 focus:border-black"
              placeholder="Enter Your full name"
              name="fullName"
              required
            />

            <input
              type="email"
              className="col-span-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
              placeholder="Your Email"
              name="email"
              required
            />

            <input
              type="number"
              className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
              placeholder="Contact Number"
              name="phone"
              required
            />

            <input
              type="number"
              className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
              placeholder="Age"
              name="age"
              required
            />

            <input
              type="password"
              className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
              placeholder="Password"
              name="passkey"
              required
            />
          </div>
          <div className="Address w-full m-5 mx-10">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Address
            </label>
            <div className=" grid grid-cols-4 grid-rows-2 gap-4 w-full  ">
              <input
                type="text"
                className="col-span-4 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                name="street"
                placeholder="Street"
                required
              />
              <input
                type="text"
                className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                name="city"
                placeholder="city"
                required
              />
              <input
                type="text"
                className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                name="state"
                placeholder="state"
                required
              />
              <input
                type="text"
                className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black "
                name="country"
                placeholder="country"
                required
              />
              <input
                type="number"
                className="row-start-2 bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none focus:border-b-2 focus:border-black"
                name="pinCode"
                placeholder="Pin Code"
                required
              />
            </div>
          </div>
        </form>

        <div className="Register-btn flex justify-center m-10">
          <button
            onClick={Register}
            className=" bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
          >
            Register
          </button>
        </div>
      </section>
    </div>
  );
};

export default Register;
