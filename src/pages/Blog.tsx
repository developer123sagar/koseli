import { Footers } from "@/components";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { BlogItem } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface Search {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
}

export default function Blog(props:Search) {
  const handleClick = (item: BlogItem) => {
    navigate(`/blogDetail/${item.title}`);
    localStorage.setItem("blog", JSON.stringify(item));
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "blogs/active" }));
  }, [dispatch]);

  return (
    <>
     <HeaderWithSearch
   sliderNumber={props.sliderNumber}
   setSliderNumber={props.setSliderNumber}
   setLongitude={props.setLongitude}
   setLatitude={props.setLatitude}
   setScrollDown={props.setScrollDown}
   setPermission={props.setPermission}
   latitude={props.latitude}
   longitude={props.longitude}
   hideSlider={true}
   headerLocation={true}/>
        <div className="">
          <div className="relative mt-10 sm:mt-6  ">
            <img
              src="/img/Blog/blogPage.png"
              alt=""
              className="w-full  md:h-[20rem] h-[12rem]  object-cover  "
            />
            <div className="absolute inset-0 bg-black  bg-opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full ">
              <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
                <em className="w-[60px] h-[2px] bg-[#e01f2d] mx-auto" />
              </span>
              <h1 className="w-fit mx-auto text-black font-bold md:text-3xl text-2xl mb-2 ">
                Blogs
              </h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  gap-10 mt-4 sm:py-10  flex-wrap mx-4  ">
            <div className=" flex gap-4 flex-col  ">
              <div className=" flex gap-10   rounded  flex-col md:flex-row  ">
                {data &&
                  Array.isArray(data) &&
                  data?.map((item: BlogItem, id: number) => (
                    <div
                      className=" admin-header p-2  "
                      key={`${item}..${id}`}
                      onClick={() => handleClick(item)}
                    >
                      <div className=" ">
                        <div className="  w-full   ">
                          <img
                            src={`${baseImgUrl}/${item?.images}`}
                            alt=""
                            className="w-80  h-60 object-cover rounded object-center"
                          />
                        </div>
                        <div className=" ">
                          <div className="   ">
                            <div>
                              <h1 className="text-[#333333] font-bold text-2xl mb-2 hover:text-red-600 pointer truncate h-10 overflow-hidden">
                                {item?.title}
                              </h1>

                              <h1 className="text-[black] flex  mx-2 items-center gap-4">
                                <FaUserAlt /> {item?.author}
                              </h1>
                              <h1 className="text-[#999999] text-[12px] mt-2 ">
                                Published:{" "}
                                {new Date(
                                  item?.createdDateTime
                                ).toLocaleString()}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* 2nd part */}
          </div>
        </div>
        <Footers />
    
    </>
  );
}
