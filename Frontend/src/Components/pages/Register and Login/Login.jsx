import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { alertError, alertInfo } from "../../Utils/Alert";
import { addUser, clearUser } from "../../Utils/Slices/UserInfoSlice";
import { FetchData } from "../../Utils/fetchFromAPI";

const LogIn = () => {
  // Utility variables

  const [user, setUser] = useState({
    email: "",
    passkey: "",
  });

  const navigate = useNavigate();
  const Dispatch = useDispatch();

  // utility Functions
  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const LogInFn = async () => {
    try {
      const response = await FetchData("user/login", "post", user);
      console.log(response);
      // Storing the tokens into browser's local storage
      localStorage.setItem("AccessToken", response.data.data.AccessToken);
      localStorage.setItem("RefreshToken", response.data.data.RefreshToken);

      // Storing data inside redux store
      Dispatch(clearUser());
      Dispatch(addUser(response.data.data.User));

      // console.log(response);
      alertInfo(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alertError(error.message);
    }
  };

  return (
    <div className="text-white flex  w-full h-full justify-center items-center ">
      <section className="Form_side   ">
        <div className="Google_signIn m-auto mt-10 px-3 w-fit text-black flex justify-center items-center rounded-full  border-b-2 border-l-2 border-white/30 bg-white/30 drop-shadow-xl  hover:scale-110 hover:drop-shadow-2xl transition duration-150 ease-in-out cursor-pointer">
          <h3 className="font-medium text-center ">Login with google </h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
            alt=""
            className="w-7 m-2"
          />
        </div>

        <h1 className="text-center mt-2 mb-5 text-lg">--- Login ---</h1>

        <form className="Form  flex flex-col justify-center items-center">
          <div className="UserName w-72 m-5">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Email
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
              placeholder="Vivek"
              name="email"
              value={user.email}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="password w-72 m-5">
            <label
              htmlFor="password"
              className="block mb-2 text-lg w-fit font-serif txt-Gray"
            >
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
              placeholder="****"
              name="passkey"
              value={user.passkey}
              onChange={HandelInputChange}
              required
            />
          </div>
        </form>

        <div className="Login-btn flex justify-center m-10">
          <button
            onClick={LogInFn}
            className=" bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105"
          >
            LogIn
          </button>
        </div>
      </section>
    </div>
  );
};

export default LogIn;
