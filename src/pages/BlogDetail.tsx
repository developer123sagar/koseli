import { Footers } from "@/components";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { BlogItem } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
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
export default function BlogDetail(props:Search) {
  const blogDataString = localStorage.getItem("blog");
  const blogData: BlogItem = blogDataString ? JSON.parse(blogDataString) : {}
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "blogs/active" }));
  }, [dispatch]);


  console.log(blogData);
  console.log(data)
  
  const filteredPosts = data?.filter((item: BlogItem) => item._id== blogData._id);

console.log(filteredPosts);



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
        <div >
        <div className="relative  mt-10 sm:mt-6">
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
              <h1 className="w-fit mx-auto text-black font-bold text-4xl mb-2 ">
                Blogs
              </h1>
            </div>
          </div>

          <div className="sm:mt-10 mt-6">
          {blogData && 
          <div className="flex flex-col md:flex-row justify-center  md:mx-20 gap-10">
              <div className=" sm:w-9/12 w-full p-3 md:p-1 admin-header  ">
                <div className="md:p-4 ">
                      <div className="  w-full  ">
                        <img
                          src={`${baseImgUrl}/${blogData?.images}`}
                          alt=""
                          className="w-full h-[14rem] sm:h-[24rem] object-cover rounded object-center"
                        />
                      </div>
                      <div className="  ">
                        <div className="   ">
                          <div>
                            <h1 className="text-[#333333] font-bold text-[16px] sm:text-2xl mb-2 mt-2 hover:text-red-600 pointer  overflow-hidden">
                              {blogData?.title}
                            </h1>
                            <h1 className=" font-medium text-[12px] sm:text-[16px] text-justify mb-2  pointer  overflow-hidden">
                              {blogData?.description}
                            </h1>
<div className="flex justify-between w-full ">
                            <h1 className="text-[black] flex  mx-2 items-center gap-4">
                              <FaUserAlt /> {blogData?.author}
                            </h1>
                            <h1 className="text-[#999999] text-[12px] mt-2  ">
                              Published:{" "}
                              {new Date(blogData?.createdDateTime).toLocaleString()}
                            </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    {/* 2nd part */}
         <div className=" w-full  md:w-4/12 sm:h-[26rem] overflow-scroll overflow-hidden">
         <div className=" hidden md:block admin-header p-2 sm:p-4">
                <div >
                  <h1 className="font-bold text-[12px ]  md:text-2xl mt-4 mb-4"> Article</h1>
                  {filteredPosts?.map((item: BlogItem,id:number) => (
                    <div key={id}>
                      <hr />
                      <div className="  w-full gap-4 mb-3  mt-4">
                        <div className="basis-[25%]  ">
                          <img
                            src={`${baseImgUrl}/${item?.images}`}
                            alt=""
                            className="w-full mt-1 md:h-40 lg:h-60 object-cover  object-center"
                          />
                        </div>
                        <div className=" basis-[80%] ">
                        <h1 className="text-[#333333] font-extrabold text-xl mb-2 hover:text-red-600 pointer">
                            {item?.title}
                          </h1>
                          <h1 className="text-[#999999] text-[16px] mb-2">
                            {new Date(item?.createdDateTime).toLocaleString()}
                          </h1>
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
         </div>
          </div>
        

          }
          </div>
        </div>
    
     
        <Footers />
  
    </>
  );
}
