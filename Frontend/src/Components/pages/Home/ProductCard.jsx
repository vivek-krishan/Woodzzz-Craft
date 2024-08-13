import { IndianRupee } from "lucide-react";
import { Products } from "../../Utils/productImg";

const ProductCard = ({ index, width, height }) => {
  // console.log(height);
  // console.log(typeof height);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  ">
      <div
        //  height ? height : "20vh"
        className={`w-[${width}]  h-[${height}] rounded-xl bg-white    overflow-hidden`}
      >
        <img
          key={index + "img"}
          src={Products[index]?.img}
          alt="Banner"
          className={`slide w-full drop-shadow-xl  transition duration-200 rounded-xl`}
        />
      </div>
      <div className="details m-2 flex flex-wrap justify-evenly">
        <div className="w-full">
          <h5 className="text-lg font-bold text-center">
            {Products[index]?.name}
          </h5>
        </div>
        <div className="flex w-full justify-between">
          <div className=" w-12 rounded-lg bg-green">
            <h5 className="text-center text-white">
              {Products[index]?.rating}
            </h5>
          </div>
          <div className="flex">
            <IndianRupee width={15} />
            <h5 className="text-md">{Products[index]?.price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
