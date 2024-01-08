import { PageLayout } from "@/layout";
import { Footers } from "@/components";
import { useEffect } from "react";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/common";

export default function Wishlist() {
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "wishlist", token: userToken! }));
  }, [dispatch, userToken]);

  const navigate = useNavigate();

  return (
    <>
      <PageLayout>
        <div className="w-full pb-20 mt-36 min-h-[100vh]">
          <div className="relative flex items-center justify-center">
            <div className="absolute ">
              <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
                <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
              </span>
              <h1 className="w-fit mx-auto font-bold text-4xl mb-10">
                Wishlist
              </h1>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <ul className="app">
              <div className="flex gap-6 justify-center pl-0 sm:justify-start sm:pl-10 flex-wrap">
                {data &&
                  Array.isArray(data) &&
                  data?.map((item) => (
                    <div
                      className="gap-6 bg-slate-50 shadow-lg group transition-all duration-500 relative"
                      key={`${item?._id}`}
                    >
                      <div
                        className="relative group admin-header w-[270px] h-[240px] overflow-hidden"
                        onClick={() => navigate(`/food_details/${item.name}`)}
                      >
                        <figure className="relative cursor-pointer">
                          <img
                            src={`${baseImgUrl}/${item?.restaurant?.mainImage}`}
                            alt={item.name}
                            className="w-full h-[10rem] object-cover object-center"
                          />

                          <div className="flex">
                            <div className="flex absolute bottom-[1px] bg-[#00000066] z-0 h-10 w-full mt-2">
                              <div className="mx-4 flex items-center">
                                <FaLocationDot className="text-[#ffffff]" />
                                <h1 className="ml-2 text-white font-bold">
                                  {item?.restaurant?.address}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </figure>
                        <div className="flex justify-between gap-2 mt-2 mx-2">
                          <div>
                            <h1 className=" text-left font-bold ">
                              {item?.restaurant?.name}{" "}
                            </h1>
                          </div>
                          <div>
                            <div className="flex items-center ml-10">
                              <AiFillStar color="black" className="mr-2" />
                              <h1 className="font-bold  text-black  mr-2">
                                {item?.restaurant?.averageRating}
                              </h1>
                            </div>
                            <div className="flex items-center rounded-[20px]">
                              <AiOutlineClockCircle className="mr-2 text-[black]" />
                              <h1 className="font-bold text-green ">
                                {item?.restaurant?.averageDeliveryTime} min
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-1 right-4 w-8 h-8 text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                        <img
                          loading="lazy"
                          src="/fav.png"
                          className="h-8 w-8 object-cover"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </ul>
          )}
        </div>
        <Footers />
      </PageLayout>
    </>
  );
}
