import LogIn from "./Login";
import Register from "./Register";

const Authentication = () => {
  return (
    <div className="flex">
      <div className="w-3/5">
        <Register />
      </div>
      <div className="w-2/5">
        <LogIn />
      </div>
    </div>
  );
};

export default Authentication;
