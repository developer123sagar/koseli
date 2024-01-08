import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { baseImgUrl } from "@/routes";
import { Review } from "@/types"; 

export default function DashboardReview() {
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.signin);

  console.log(data);

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "review/restaurant-review", token: token! })
    );
  }, [dispatch, token]);


  return (
    <>
       <h1> Hello </h1>
        <div className="mt-20 mx-4 ">
          {data &&
            Array.isArray(data) &&
            data?.map((item: Review, i: number) => (
              <div key={i}>
                <div className="flex gap-5 justify-center  ">
                  <div>
                    <img
                      src={`${baseImgUrl}/${item?.foodId?.activeImage}`}
                      alt=""
                      className="h-60"
                    />
                  </div>
                  <div className="  h-72">
                    <h1 className="text-[#33333] font-bold text-[14px]">
                      FoodReview
                    </h1>
                    <h1 className="text-[#333333] text-[36px] font-bold">
                      3.5
                    </h1>
                    <h1 className="flex text-yellow-400">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </h1>
                    <p className="text-[#999999] font-bold text-[20px] ">
                      120reviews
                    </p>
                    <div className="mt-2">
                      <p className="text-[#555555] gap-4 flex my-auto">
                        <progress
                          value="90"
                          max="100"
                          className="w-96 bg-green-800 text-black custom-progress"
                        ></progress>
                        <span className="flex items-center gap-1">
                          6
                          <AiFillStar style={{ color: "#FFD700" }} />
                        </span>
                      </p>
                      <p className="text-[#555555] gap-4 flex my-auto">
                        <progress
                          value="90"
                          max="100"
                          className="w-96 bg-green-800 text-black custom-progress"
                        ></progress>
                        <span className="flex items-center gap-1">
                          3
                          <AiFillStar style={{ color: "#FFD700" }} />
                        </span>
                      </p>
                      <p className="text-[#555555] gap-4 flex my-auto">
                        <progress
                          value="90"
                          max="100"
                          className="w-96 bg-green-800 text-black custom-progress"
                        ></progress>
                        <span className="flex items-center gap-1">
                          2
                          <AiFillStar style={{ color: "#FFD700" }} />
                        </span>
                      </p>
                      <p className="text-[#555555] gap-4 flex my-auto">
                        <progress
                          value="70"
                          max="100"
                          className="w-96 bg-green-800 text-black custom-progress"
                        ></progress>
                        <span className="flex items-center gap-1">
                          3
                          <AiFillStar style={{ color: "#FFD700" }} />
                        </span>
                      </p>
                      <p className="text-[#555555] gap-4 flex my-auto">
                        <progress
                          value="60"
                          max="100"
                          className="w-96 bg-green-800 text-black custom-progress"
                        ></progress>
                        <span className="flex items-center gap-1">
                          2
                          <AiFillStar style={{ color: "#FFD700" }} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap  gap-10 ">
                  {/* 1stpart */}

                  <div className="flex gap-4   flex-col ">
                    <div className="">
                      <div className=" gap-4  flex">
                        <div>
                          <div className=" flex flex-wrap gap-10">
                            <div className=" gap-4 flex  admin-header p-2  w-96">
                              <div className="flex flex-col  w-96 ">
                                <div>
                                  <p className="text-[#333333] text-[16px] text-justify  ">
                                    {item.review}
                                  </p>
                                </div>
                                <hr />
                                <div className="justify-between mt-2  flex">
                                  <div>
                                    <img
                                      src=""
                                      alt=""
                                      className="w-8 h-8 rounded-full"
                                    />
                                  </div>
                                  <div className="">
                                    <h1 className="text-[#333333] font-bold text-[16px]">
                                      {item?.user?.name}
                                    </h1>
                                  </div>
                                  <p className="flex gap-1 items-center font-bold">
                                    {item?.rating}
                                    <AiFillStar color="#FFD700" />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </>
  );
}
