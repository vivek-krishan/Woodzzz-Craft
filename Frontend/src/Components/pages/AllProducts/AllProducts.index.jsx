import { useEffect } from "react";
import Banner from "../../Genral purpose/Banner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCardAI } from "../../Genral purpose/product-card";
import LoadingUI from "../../Genral purpose/Loading";

const AllProducts = ({ data = null, startLoading, stopLoading }) => {
  // Get products from Redux store
  const reduxProducts = useSelector((store) => store.ProductsList.products);

  // Determine which products to use (data prop has priority)
  const productsToDisplay = data || reduxProducts;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productsToDisplay) {
    return <div>No products available</div>;
  }

  return (
    <div className="flex justify-evenly h-fit mt-10">
      <section className="Products lg:w-4/5 h-fit lg:ml-10">
        <div className="Recommendation">
          <div className="grid lg:grid-cols-5 lg:gap-24 lg:m-10 grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 md:m-10">
            {productsToDisplay.map((item, index) => (
              <Link
                key={`${item.productId}-${index}`} // Better key combining productId and index
                to={`/product/${item.productId}`}
                className="bg-Tan rounded-xl h-fit"
              >
                <div className="lg:w-48 w-40 md:w-full">
                  <ProductCardAI product={item} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingUI(AllProducts);
