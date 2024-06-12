import Banner from "../../Genral purpose/Banner";

const Crousel = () => {
  return (
    <div className="Crousel flex ">
      <div className="CaptainImg m-10 min-w-fit">
        <Banner images={1} start={2} details={true} />
      </div>
      <div className="Players overflow-hidden overflow-x-scroll no-scrollbar flex flex-col  before:absolute before:left-1/3 before:z-40 before:w-44 before:h-3/5  before:bg-gradient-to-r from-[#f4f4f5] to-transparent ">
        <div className="flex felx-col h-40 min-w-40 m-10  ">
          <Banner images={10} start={10} details={true} width={"7vw"} />
        </div>
        <div className="flex felx-col h-40 min-w-40 m-10  ">
          <Banner images={10} start={30} details={true} width={"7vw"} />
        </div>
      </div>
    </div>
  );
};

export default Crousel;
