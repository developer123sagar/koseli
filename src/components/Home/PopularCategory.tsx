import SeeAll from "@/common/SeeAll";
import { Popular_category_content } from "@/constants";
import { fetchFoodCategory } from "@/redux/foods/foodDetailSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

interface PopularCategory {
  noTitle: boolean;
}

const PopularCategory = (props: PopularCategory) => {
  // Destructuring
  const { title } = Popular_category_content;
  const [forceUpdate, setForceUpdate] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFoodCategory({}));
  }, [dispatch]);

  useEffect(() => {
    if (forceUpdate > 0) {
      setForceUpdate(0);
    }
  }, [forceUpdate]);

  const { category } = useAppSelector((state: RootState) => state.foodDetails);

  return (
    <>
      {!props.noTitle && (
        <div className="flex items-center justify-center flex-col   ">
          <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mb-4">
            <em className="w-[60px]   h-[2px] bg-[#e54350]" />
          </span>
          <h1 className="font-bold htext-2xl">{title}</h1>
        </div>
      )}
         <SeeAll
          title={""}

          data={category}
          link="/toprestaurant"
          scrollRef={scrollRef}
          seeAll={false}
          showSeeAll={true}
          showline={true}
        />
        <div ref={scrollRef} className="hideScrollBar whitespace-nowrap  flex scroll-smooth ">
      <ul className="md:w-full min-w-[400px]  max-w-[900px] md:min-w-full md:max-w-full  mx-auto my-4 pl-3 pr-6   ">
      
        <div className="flex  overflow-x-scroll"  >
          {category?.map((item, id) => (
            <Link
              key={id}
              to={`/filteredSearch/${item.name}/noId`}
              onClick={() => setForceUpdate(forceUpdate + 1)}
            >
              <section className="relative   gap-4  cursor-pointer p-2  " >
           
                <div className="relative w-20  flex-col justify-center  items-center">
                  <figure className="flex items-center justify-center">
                  <img
                    width={100}
                    height={100}
                    className="   w-15 h-15 object-cover   rounded-full"
                    src={`${baseImgUrl}/${item.images[0]}`}
                    alt={item.name}
                  />
                  </figure>
                  <div className="absolute top-0 left-0 w-full  h-full flex text-center items-center justify-center  " />
                  <div className=" w-full  items-center flex ">
                    <span className="text-black text-center    cursor-pointer  h-12 w-full font-bold items-center justify-center  text-sm   no-wrap  bg-opacity-80  rounded">
                      {item.name}
                    </span>
                  </div>
                </div>
              
              </section>
            </Link>
          ))}
        </div>
      </ul>
      </div>
    </>
  );
};

export default PopularCategory;
