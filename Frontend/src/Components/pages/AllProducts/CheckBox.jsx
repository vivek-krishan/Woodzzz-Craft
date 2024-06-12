import { useState } from "react";
import { FilterData } from "../../Utils/FilterData";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const CheckBox = () => {
  const DataArray = Object.entries(FilterData);
  const [opened, setOpened] = useState("none");
  const [filterSelected, setFilterSelected] = useState("none");

  return (
    <div className="flex flex-col z-50">
      {DataArray.map((catagory) => {
        return (
          <div>
            <button
              onClick={() => {
                setOpened(catagory[0]);

                if (opened === catagory[0]) {
                  setOpened("none");
                }
              }}
            >
              <div className="SelectTitle bg-gray-100 rounded-lg w-52 m-2 px-4 py-1  flex cursor-pointer">
                <span className="selection-text text-lg">{catagory[0]}</span>
                {catagory[0] === opened ? (
                  <span className={`SlideArrow Upward`}>
                    <ChevronUp />
                  </span>
                ) : (
                  <span className={`SlideArrow`}>
                    <ChevronDown />
                  </span>
                )}
              </div>
            </button>
            <ul className="ListItems overflow-hidden">
              {catagory[0] === opened &&
                catagory[1].map((item) => {
                  return (
                    <li className="item flex justify-center items-center ml-5 m-3 bg-slate-200 w-fit h-10 px-4 rounded-lg z-40">
                      <button
                        className="border border-gray-800 h-7 w-7 mr-2 z-30"
                        onClick={() => {
                          setFilterSelected(item);

                          if (filterSelected === item) {
                            setFilterSelected("none");
                          }
                        }}
                      >
                        {filterSelected === item ? (
                          <div className={`CheckBox overflow-hidden scale-100`}>
                            <Check />
                          </div>
                        ) : (
                          <div className={`CheckBox overflow-hidden scale-0`}>
                            <Check />
                          </div>
                        )}
                      </button>
                      <span className="btn-text">{item}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBox;
