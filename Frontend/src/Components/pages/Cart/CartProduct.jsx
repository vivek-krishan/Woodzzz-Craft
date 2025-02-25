const CartProduct = ({ item }) => {
//   console.log(item);

  return (
    <div>
      <div className=" w-full h-fit m-2 lg:mt-4 overflow-hidden bg-white rounded-xl drop-shadow-lg hover:drop-shadow-2xl transition delay-100 flex justify-between items-center">
        <div className="w-fit h-fit m-2">
          <img src={item?.image} alt="product" className="h-16" />
        </div>
        <h1 className="m-2 font-medium text-lg">{item?.priceInfo?.linePrice}</h1>
      </div>
    </div>
  );
};

export default CartProduct;
