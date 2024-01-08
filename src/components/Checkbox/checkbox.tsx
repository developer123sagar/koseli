
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CheckBoxProps {
  selectedOption: number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  setShowComboOffers: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSpecialPackage: React.Dispatch<React.SetStateAction<boolean>>;
  showComboOffers: boolean;
  showSpecialPackage: boolean;
  comboOfferRef: React.RefObject<HTMLDivElement>;
  specialPackageRef: React.RefObject<HTMLDivElement>;
  setSortByTime: React.Dispatch<React.SetStateAction<boolean>>;
  priceValue: string;
  setPriceValue: React.Dispatch<React.SetStateAction<string>>;
  setFilterOnPrice: React.Dispatch<React.SetStateAction<boolean>>;
}


function CircularCheckboxes(props: CheckBoxProps) {
  const handleCheckboxChange = (index: number) => {
    props.setSelectedOption(index);

    if (index === 0) props.setSortByTime(true);
    else props.setSortByTime(false);
  };
  const [showDropdown, setshowDropdown] = useState(false);

  const toggleMenu = () => {
    setshowDropdown(!showDropdown)
  }


  const checkboxes = ["Time", "Rating"];
  const checkbox2 = ["Combo offers", "Special package"];





  return (
    <div className=" overflow-x-hidden overflow-y-scroll ">
      {checkboxes.map((label, index) => (
        <div key={index} className=" flex items-center  customs-checkbox">
          <label key={index}>
            <input
              type="checkbox"
              checked={props.selectedOption === index}
              onChange={() => handleCheckboxChange(index)}
              className="mr-2 cursor-pointer"
            />
            {label}
          </label>
          <br />
        </div>
      ))}
      <div onClick={() => toggleMenu()} className="flex  items-center cursor-pointer justify-between mt-10  ">
        <h5 className=" mb-2 font-bold"> Specials : </h5>
        {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <AnimatePresence>
        {showDropdown &&
          (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: "just", stiffness: "100" }}
              layout
            >
              <div>
                {checkbox2.map((label, index) => (
                  <div key={index}>
                    <button
                      className="mr-2 cursor-pointer bg-[rgb(240,240,240)]  p-2 pl-5 pr-5 w-full mt-2 rounded-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        if (index === 0) {
                          if (props.comboOfferRef.current !== null) {
                            const rect =
                              props.comboOfferRef.current.getBoundingClientRect();
                            const targetPosition = window.scrollY + rect.top;
                            window.scrollTo({
                              top: targetPosition,
                              behavior: "smooth",
                            });
                          }
                        }
                        if (index === 1) {
                          if (props.specialPackageRef.current !== null) {
                            const rect =
                              props.specialPackageRef.current.getBoundingClientRect();
                            const targetPosition = window.scrollY + rect.top;
                            window.scrollTo({
                              top: targetPosition,
                              behavior: "smooth",
                            });
                          }
                        }
                      }}
                    >
                      {" "}
                      {label}{" "}
                    </button>

                    <br />
                  </div>
                ))}
              </div>
            </motion.div>)}
      </AnimatePresence>

      <h5 className="mt-10 mb-2 cursor-pointer">Minimum Checkout:&nbsp; {props.priceValue}</h5>
      <div>
        <input
          value={props.priceValue}
          type="range"
          onChange={(e) => props.setPriceValue!(e.target.value)}
          max={10000}
        />
      </div>
      <br />
      <button
        className="py-3 px-4 bg-[rgb(240,240,240)] font-bold rounded-full w-full"
        onClick={(e) => {
          e.preventDefault();
          props.setFilterOnPrice(true);
        }}
      >
        {" "}
        Filter on checkout{" "}
      </button>

    </div>
  );
}

export default CircularCheckboxes;
