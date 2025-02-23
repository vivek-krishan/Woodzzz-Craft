// import Image from "next/image";
import { Card, CardContent, CardFooter } from "./card";
import Button from "./Buttons";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export function ProductCardAI({ index, width, height }) {
  const allProduct = useSelector((store) => store.ProductsList.products);
  if (!allProduct) return null;
  if (index >= allProduct.length) {
    index = index % allProduct.length;
  }

  return (
    <Card className="Card overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={allProduct[index]?.images[0] || "/placeholder.svg"}
            alt={allProduct[index]?.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110  "
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full items-center justify-center">
              <Button className="bg-white text-black hover:bg-white/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex-col items-start">
        <h3 className="font-semibold group-hover:text-[#3C7A5D] transition-colors">
          {allProduct[index]?.name}
        </h3>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-medium">
            ₹{allProduct[index]?.price.currentPrice}
          </p>
          <div className="flex">
            {Array.from({ length: allProduct[index]?.rating }).map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
