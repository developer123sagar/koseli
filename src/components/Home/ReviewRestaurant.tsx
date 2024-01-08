import { BookDetail_Review } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
interface Review {
  description: string;
  rating: number;
  photo: [];
  clientId: {
    id: string;
    name: string;
    photo:""
  };
  createdAt: "";
}

export default function TopRestaurantReview() {
  const dispatch = useAppDispatch();
  const { restaurantId } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  const { bookingreview } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  console.log(bookingreview)  
  useEffect(() => {
    dispatch(BookDetail_Review({ restaurantId: restaurantId }));
  }, [dispatch, restaurantId]);

  const Rating=bookingreview.length;
  console.log(bookingreview.length);
  const extractedRatings = bookingreview.map((item: any) => {
    return item.rating;
  });
  const AverageRating=(extractedRatings/Rating);

  const Rating4 = extractedRatings.filter((rating: any) => rating === 4);
  const Rate4 = (extractedRatings.length / Rating4.length) * 100;
  const Rating3 = extractedRatings.filter((rating: any) => rating === 3);
  const Rate3 = (extractedRatings.length / Rating3.length) * 100;
  const Rating5 = extractedRatings.filter((rating: any) => rating === 5);
  const Rate5 = (extractedRatings.length / Rating5.length) * 100;
  const Rating2 = extractedRatings.filter((rating: any) => rating === 2);
  const Rate2 = (extractedRatings.length / Rating2.length) * 100;
  const Rating1 = extractedRatings.filter((rating: any) => rating === 1);
  const Rate1 = (extractedRatings.length / Rating1.length) * 100;

  return (
    <>
      {Array.isArray(bookingreview) && bookingreview.length>0 && <h1 className="text-[20px] md:text-[1.5rem] font-semibold">Review</h1>}
      {Array.isArray(bookingreview) &&
        bookingreview?.map((item: Review, index: number) => (
          <div className="mt-2  " key={index}>
            <div className="flex gap-8  ">
              <div className="border  bg-[#FDCC0D]  w-[30%]  rounded h-28 md:h-36 flex flex-col items-center justify-center text-center text-black">
                <h1 className="md:text-3xl text-xl font-bold">{AverageRating}</h1>
                <h1 className="font-2xl font-bold text-red-600">Superb</h1>
                <h1 className="text-black font-bold">Based on Average Review</h1>
              </div>
              <div className="mt-2 flex  w-[60%] md:w-[70%] flex-col gap-1  ">
                <p className="text-[#555555] flex gap-2 items-center  text-[12px] md:text-[16px]  font-bold">
                  {" "}
                  <progress
                    value={Rate5}
                    max={100}
                    className="md:w-[28rem] w-[20rem]  text-black   custom-progress "
                  ></progress>
                   5<AiFillStar color="#FDCC0D"/>
                </p>
                <p className="text-[#555555] flex md:text-[16px] text-[12px]  gap-2 items-center font-bold">
                  {" "}
                  <progress
                    value={Rate4}
                    max="100"
                    className="w-[28rem] bg-[#FDCC0D] text-black   font-bold  custom-progress"
                  ></progress>
                  4<AiFillStar color="#FDCC0D"/>
                </p>
                <p className="text-[#555555] flex gap-2 items-center text-[12px] md:text-[16px] font-bold">
                  {" "}
                  <progress
                    value={Rate3}
                    max="100"
                    className="w-[28rem]  text-black text-[12px] md:text-[16px] custom-progress"
                  ></progress>
                  3<AiFillStar color="#FDCC0D"/>
                </p>
                <p className="text-[#555555] flex  text-[12px] md:text-[16px] gap-2 items-center font-bold">
                  {" "}
                  <progress
                    value={Rate2}
                    max="100"
                    className="w-[28rem]  text-black text-[12px] md:text-[16px] custom-progress"
                  ></progress>
                  2<AiFillStar color="#FDCC0D"/>
                </p>
                <p className="text-[#555555] flex gap-2 items-center text-[12px] md:text-[16px]  font-bold">
                  {" "}
                  <progress
                    value={Rate1}
                    max="100"
                    className="w-[28rem] bg-[#FDCC0D] text-black  custom-progress"
                  ></progress>
                1<AiFillStar color="#FDCC0D"/>
                </p>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="flex flex-col w-[1/2] p-1 flex-wrap md:p-0 gap-2 ">
              <div>
                <div className="flex gap-2 mt-4    ">
                  <figure className="flex ">
                    <img
                      src={`${baseImgUrl}/${item.clientId.photo}`}
                      className="h-24 w-28   rounded"
                    />
                  </figure>
                  <div className="border p-4   w-full border-gray-300">
                  <h2 className="text-[#555555] text-justify ">
                      {item.description}
                    </h2>
                  
                    <p className="text-[#777777] ">{item.clientId.name}</p>
                    <div className="flex justify-between">
                    <p className="text-[#777777]">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                    <p className=" flex items-center  ">
                      {item.rating}
                      <AiFillStar className="text-[#FDCC0D]" />
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
