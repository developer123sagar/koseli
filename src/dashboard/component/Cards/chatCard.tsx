import { useEffect, useState } from "react";
import axios from "axios";
import { baseImgUrl, url } from "@/routes";
import { RootState, useAppSelector } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { fetchRestAdminId } from "@/redux/restaurant/restaurantSlice";
import { Link } from "react-router-dom";

const ChatCard = () => {
  const [restaurantChattedUsers, setRestaurantChattedUsers] = useState([]);
    const { role } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const { restAdminId } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const token = useAppSelector((state: RootState) => state.signin.token);
  useEffect(() => {
    dispatch(fetchRestAdminId(token));
  }, [dispatch]);

  useEffect(() => {
    const getUserChatData = async (id: string | null) => {
      try {
        const res = await axios.get(`${url}/chat/${id}`);
        console.log(res);
        setRestaurantChattedUsers(res.data.Data);
        return res.data;
      } catch (err) {
        console.log(err);
        const customError = new Error(
          "An error occurred: " + (err as Error).message
        ) as Error;
        throw customError;
      }
    };
    if (restAdminId && restAdminId._id) getUserChatData(restAdminId._id);
  }, [restAdminId]);
  return (
    <>
    {role == "admin" ? (
   null
    ):
    (
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default  xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black ">Chats</h4>
<Link to="/dashboard/restaurant/chat">
      <div className="Chat-list">
        {restaurantChattedUsers.length > 0 ?(
          restaurantChattedUsers.map((ru: any, i: number) => (
            <div key={i}>
              <div className="follower conversation" key={i}>
                {ru.members[0] && (
                  <div className="flex gap-3 items-center">
                    {ru.members[0].mainImage ? (
                      <img
                        src={`${baseImgUrl}/${ru.members[0].mainImage}`}
                        className="followerImage h-[30px] w-[30px] rounded-full"
                      />
                    ) : (
                      <img
                        src="/img/defaultIcon.jpg"
                        className="followerImage h-[50px] w-[50px] rounded-full"
                      />
                    )}
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                      <span className="text-[20px] font-bold">
                        {" "}
                        {ru.members[0].name}{" "}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <hr
                className="w-[85%]"
                style={{ border: "0.1px solid #ececec" }}
              />
            </div>
          ))):(<p>No data available</p>)}
      </div>
      </Link>
    </div>
    )}

    </>
  );
};

export default ChatCard;
