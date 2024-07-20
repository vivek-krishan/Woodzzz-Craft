// import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  // All Variables declaration for this components
  const [avatar, setAvatar] = useState();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    age: Number,
    passkey: "",
    address: Number,
    pinCode: Number,
  });

  // All function defination

  const HandelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const HandelImage = (event) => {
    console.log(event.target.files);
    setAvatar(event.target.files);
    console.log(avatar);
  };

  const Register = async () => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(user),
        redirect: "follow",
      };

      console.log(requestOptions);

      fetch("http://localhost:3000/api/v1/user/register", requestOptions)
        .then((response) => response.json())
        .then((result) => alertInfo(result.data.message))
        .catch((error) => console.error(error));
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

        <form className="Form flex flex-wrap justify-center">
          <div className="fullName w-72 m-5">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Full Name
            </label>
            <input
              type="text"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
              placeholder="vivek krishan"
              name="fullName"
              value={user.fullName}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="email w-72 m-5">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
              placeholder="user@gmail.com"
              name="email"
              value={user.email}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="age w-72 m-5">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Age
            </label>
            <input
              type="number"
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
              placeholder="20"
              name="age"
              value={user.age}
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
              className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5    dark:placeholder-gray-700 dark:text-black "
              placeholder="****"
              name="passkey"
              value={user.passkey}
              onChange={HandelInputChange}
              required
            />
          </div>
          <div className="Address w-full m-5 mx-10">
            <label className="block mb-2 text-lg w-fit font-serif txt-Gray">
              Address
            </label>
            <div className="flex flex-wrap justify-between w-full  ">
              <div className="mx-4 w-full">
                <label className="block mb-2 text-sm w-fit font-serif text-gray-600">
                  Address 1
                </label>
                <input
                  type="text"
                  className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-700 dark:text-black "
                  name="address"
                  value={user.address}
                  onChange={HandelInputChange}
                  required
                />
              </div>

              <div className="mx-4 w-60 mt-5">
                <label className="block mb-2 text-sm w-fit font-serif text-gray-600">
                  Pin Code
                </label>
                <input
                  type="number"
                  className="bg-gray-50/20 border-l-2 border-b-2 backdrop-blur-xl border-gray-300/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
                  name="pinCode"
                  value={user.pinCode}
                  onChange={HandelInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </form>

        <div className="Register-btn flex justify-center m-10">
          <button className=" bg-green text-white p-3 px-7 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105">
            Register
          </button>
        </div>

      </section>
    </div>
  );
};

export default Register;
