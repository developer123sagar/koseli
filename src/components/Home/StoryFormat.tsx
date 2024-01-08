/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchStories } from "@/redux/restaurant/restaurantSlice";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { Link } from "react-router-dom";

const StoryFormat = () => {
  const dispatch = useAppDispatch();

  const { story } = useAppSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className="flex gap-4 p-3 mt-10 w-[100vw] overflow-x-auto ">
      {story &&
        story.map((st: any, id: number) => (
          <Link to={`/story/${st._id}`} key={id}>
            <div
              key={id}
              className="flex-none relative h-[300px] w-[200px] border border-[rgb(200,200,200)] cursor-pointer"
              style={{
                background: `url(${baseImgUrl}/${st.thumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex items-center gap-2  text-white absolute left-[10px] top-[10px]">
                <img
                  src={`${baseImgUrl}/${st.restaurantId.logo}`}
                  className=" h-[40px] w-[40px] rounded-full border border-[rgb(200,200,200)]"
                />
                <h1> {st.restaurantId.name} </h1>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default StoryFormat;
