import { useSelector } from "react-redux";
import LogIn from "./Login";
import Register from "./Register";

const Authentication = () => {
  const user = useSelector((store) => store.UserInfo.user);
  return (
    <div>
      {/* for mobile */}
      <div className="lg:hidden flex justify-center items-center flex-col">
        {user ? (
          <div className="md:w-3/5">
            <Register />
          </div>
        ) : (
          <div className="w-2/5">
            <LogIn />
          </div>
        )}
      </div>
      {/* for laptop */}
      <div className="lg:flex flex-row hidden justify-center items-start">
        {user ? (
          <div className="w-1/2 flex justify-center items-center">
            <Register />
          </div>
        ) : (
          <div className="w-1/2 flex justify-center items-center">
            <LogIn />
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
