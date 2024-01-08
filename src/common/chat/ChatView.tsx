import { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import Chat from "./chat";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
export default function ChatView() {
  const [restaurantChattedUsers, setRestaurantChattedUsers] = useState("")
  const [currentUser, setCurrentUser] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [newMessageAppeared, setNewMessageAppeared] = useState(false);
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  console.log(newMessageAppeared);

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "client/info", token: userToken! }));
  }, [dispatch, userToken]);
  useEffect(() => {
    const getUserChatData = async (id: string | null) => {
      try {
        const res = await axios.get(`${url}/chat/${id}`);
        setRestaurantChattedUsers(res.data.Data);
        return res.data;
      } catch (err) {
        console.log(err);
        const customError = new Error(
          "An error occurred: " + (err as Error).message
        ) as Error;
        throw customError;
      }
    }
    if (data && data._id) getUserChatData(data._id);

  }, [data])
  return (
    <>
      {restaurantChattedUsers.length > 0 && (
        <div>
          <div className="fixed bottom-[30px] right-[30px] cursor-pointer  ">
            <AiFillMessage
              size={36}
              onClick={() => {
                setCurrentUser("");
                setShowChat(!showChat);
              }}
            />
            <div
              className={`${!newMessageAppeared && "hidden"
                } h-[15px] w-[15px] rounded-full bg-[#e01f2d] absolute top-0 right-0`}
            />
          </div>
          <div
            className={`fixed bottom-0 right-[70px] md:right-[110px] ${!showChat && "hidden"
              }`}
          >
            <Chat
              newMessageAppeared={newMessageAppeared}
              setNewMessageAppeared={setNewMessageAppeared}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </div>)
      }

    </>
  )
}
