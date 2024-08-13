import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchProduct } from "./SearchProduct";
import AllProducts from "../AllProducts/AllProducts.index";

const SearchPage = () => {
  // const [data] = useState(
  //   Data.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items
  // );

  const [FilterItem, setFilterItem] = useState();

  const { input } = useParams();

  // useEffect(() => {
  //   setFilterItem(SearchProduct(input, data));
  // }, [input]);

  return (
    <div className="w-full h-fit">
      <AllProducts data={FilterItem} />
    </div>
  );
};

export default SearchPage;
