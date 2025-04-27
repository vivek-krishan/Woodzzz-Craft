// import Image from "next/image";
import { Card, CardContent, CardFooter } from "./card";
import Button from "./Buttons";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // install react-icons if not already
import Rating from "./Ratings";

export function ProductCardAI({ index, product }) {
  const allProduct = useSelector((store) => store.ProductsList.products);
  if (!allProduct) return null;

  if (!product) return null;
  // const RatingStars = ({ rating }) => {
  //   const totalStars = product?.rating;
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 >= 0.5;

  //   return (
  //     <div className="flex">
  //       {Array.from({ length: totalStars }).map((_, i) => {
  //         if (i < fullStars) {
  //           return <FaStar key={i} color="#EA5B2A" />;
  //         } else if (i === fullStars && hasHalfStar) {
  //           return <FaStarHalfAlt key={i} color="#EA5B2A" />;
  //         } else {
  //           return <FaRegStar key={i} color="#EA5B2A" />;
  //         }
  //       })}
  //     </div>
  //   );
  // };

  return (
    // <Card className="Card overflow-hidden transition-all duration-300 drop-shadow-md hover:drop-shadow-xl bg-[#dadada] hover:scale-105">
    //   <CardContent className="p-0">
    //     <div className="relative aspect-square overflow-hidden">
    //       <img
    //         src={allProduct[index]?.images[0]?.url || "/placeholder.svg"}
    //         alt={allProduct[index]?.name}
    //         fill
    //         className="object-cover transition-transform duration-300 "
    //       />
    //     </div>
    //   </CardContent>
    //   <CardFooter className="p-4 flex-col items-start">
    //     <h3 className="font-semibold Card-hover:text-[#3C7A5D] transition-colors truncate">
    //       {allProduct[index]?.name}
    //     </h3>
    //     <div className="flex items-center justify-between w-full">
    //       <p className="text-sm font-medium">
    //         ₹{allProduct[index]?.price.currentPrice}
    //       </p>
    //       <div className="flex">
    //         {Array.from({ length: allProduct[index]?.rating }).map((_, i) => (
    //           <span key={i} className="text-yellow-400">
    //             ★
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   </CardFooter>
    // </Card>
    <Card className="Card overflow-hidden transition-all duration-300 drop-shadow-md hover:drop-shadow-xl bg-[#dadada] hover:scale-105">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product?.images[0]?.url || "/placeholder.svg"}
            alt={product?.name}
            fill
            className="object-cover transition-transform duration-300 "
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex-col items-start">
        <h3 className="font-semibold Card-hover:text-[#3C7A5D] transition-colors truncate">
          {product?.name}
        </h3>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-medium">₹{product?.price.currentPrice}</p>
          {/* <div className="flex">
            {Array.from({ length: product?.rating }).map((_, i) => (
              <span key={i} className="text-[#EA5B2A]">
                ★
              </span>
            ))}
          </div> */}
          {/* <RatingStars /> */}
          <Rating
            value={product?.rating}
            readOnly={true}
            starColor="text-[#EB5A2A]"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
