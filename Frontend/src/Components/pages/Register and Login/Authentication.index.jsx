import LogIn from "./Login";
import Register from "./Register";

const Authentication = () => {
  return (
    <div>
      {/* for mobile */}
      <div className="lg:hidden flex justify-center items-center flex-col">
        <div className="w-3/5">
          <Register />
        </div>
        <div className="w-2/5">
          <LogIn />
        </div>
      </div>
      {/* for laptop */}
      <div className="lg:flex flex-row hidden">
        <div className="w-1/2 flex justify-center items-center">
          <LogIn />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
