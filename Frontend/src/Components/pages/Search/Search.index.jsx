import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchProduct } from "./SearchProduct";
import AllProducts from "../AllProducts/AllProducts.index";
import { searchProducts } from "../../Utils/SearchProducts";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const [FilterItem, setFilterItem] = useState();

  const { input } = useParams();
  const allProducts = useSelector((store) => store.ProductsList.products);

  useEffect(() => {
    const FilterProducts = () => {
      const items = allProducts && searchProducts(allProducts, input);
      setFilterItem(items);
    };
    FilterProducts();
  }, [allProducts]);

  return (
    <div className="w-full h-fit">
      <AllProducts data={FilterItem} />
    </div>
  );
};

export default SearchPage;
