import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, IndianRupee } from "lucide-react";
import Data from "../../Utils/Data.json";
import Banner from "../../Genral purpose/Banner";
import { addCartItem } from "../../Utils/Slices/CartInfoSlice";
import HandelCartData from "../../Utils/HandelCartData";
import { Products } from "../../Utils/productImg";

const Product = () => {
    // State variables
    const userData = useSelector((store) => store.UserInfo.user);
    const Dispatch = useDispatch();
    const Cart = useSelector((store) => store.CartInfo.cart);
    const [like, setLike] = useState(false);
    const { index } = useParams();
    const Info =
        Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]
            ?.items[index];
    let userId;
    if (userData) {
        userId = userData[0]?.user?._id;
    }

    // Utility functions
    const HandelCartItems = async (e) => {
        e.preventDefault();
        console.log(userId);
        if (userId) Dispatch(addCartItem(Info));
        else alert("Please LogIn");
    };

    useEffect(() => {
        HandelCartData(userId, Cart.cartItems);
    }, [Cart]);

    return (
        <div className="ProductPage">
            <div className="ProductDetails relative">
                <div className="ProductImg h-[75vh] m-4 rounded-3xl bg-white flex justify-center items-center overflow-hidden">
                    <img
                        src={Products[index]?.img}
                        alt="PImg"
                        className="h-[80vh]"
                    />
                </div>
                <div className="PDetails flex justify-between m-8 absolute w-[85vw] h-[74vh] top-0 ">
                    <div className="PName max-w-lg mx-16 cursor-default">
                        <h1 className="text-2xl font-bold">
                            {Products[index]?.name}
                        </h1>
                    </div>
                    <div className="Price&cart m-20 h-fit flex flex-col justify-center items-center absolute bottom-0 right-0">
                        {Products[index].wasPrice != null ||
                            (Products[index].wasPrice ===
                                Products[index]?.price && (
                                <div className="flex justify-center items-center">
                                    <IndianRupee width={15} />
                                    <h1 className="text-xl font-thin line-through">
                                        {Products[index].wasPrice}
                                    </h1>
                                </div>
                            ))}
                        <div className="Price flex items-center">
                            <IndianRupee width={15} />
                            <h1 className=" text-2xl font-medium ">
                                {Products[index]?.price}
                            </h1>
                        </div>
                        <div className="LikeBtn-And-AddToCart flex justify-center items-center">
                            {like === true ? (
                                <button
                                    className="Like m-4"
                                    onClick={() => {
                                        setLike(false);
                                    }}
                                >
                                    <Heart fill="#ff0000" color="#ff0000" />
                                </button>
                            ) : (
                                <button
                                    className="Like m-4"
                                    onClick={() => {
                                        setLike(true);
                                    }}
                                >
                                    <Heart color="#000000" />
                                </button>
                            )}
                            <button
                                className="bg-green  my-4 text-white p-3  rounded-full hover:bg-Lgreen hover:text-black transition duration-200 ease-in-out hover:scale-105"
                                onClick={HandelCartItems}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="Details-Section  my-10 border border-transparent">
                    <div className="bg-white relative bottom-12 m-4 h-fit rounded-3xl overflow-hidden">
                        <h1 className="text-xl font-[700] text-center  my-5">
                            {Products[index]?.description}
                        </h1>
                        <div className="Details w-full m-4">
                            <h1 className="text-2xl text-center font-semibold">
                                Details
                            </h1>
                            <p className="tracking-wider font-extralight leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Asperiores sapiente tenetur
                                quas assumenda eaque eveniet libero dolorem,
                                nobis inventore. Ullam fuga optio provident unde
                                ipsum, sint odit a perspiciatis vitae hic odio
                                iure quae minus iste numquam delectus
                                accusantium expedita!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Recommendation">
                <div className="Heading relative flex justify-center items-center z-0 mb-5 cursor-default p-10  ">
                    <div className="absolute -top-5">
                        <h1 className=" text-center text-9xl font-bold text-[#dadada78] ">
                            Recommended
                        </h1>
                    </div>
                    <div className="z-10 flex flex-col items-center justify-center">
                        <h1 className="text-center text-5xl font-bold txt-green">
                            Best Products
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-24 m-10">
                    <Banner
                        images={Products.length}
                        start={0}
                        details={true}
                        width={"10vw"}
                        height={"20vh"}
                    />
                </div>
            </div>
            <div className="ViewAll_btn flex justify-center m-20">
                <Link to={`/all-products`}>
                    <button className=" bg-green text-white p-3 px-4 rounded-3xl drop-shadow-xl hover:drop-shadow-2xl hover:bg-Lgreen transition duration-300 hover:scale-105">
                        View All products
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Product;
