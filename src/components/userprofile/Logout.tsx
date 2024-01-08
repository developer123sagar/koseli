import { clientLogout } from "@/redux/auth/loginSlice";
import { useAppDispatch } from "@/redux/store";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const dispatch = useAppDispatch();
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
      };
      const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLogout = () => {
        setIsMenuOpen(false);
        dispatch(clientLogout());
        navigate("/");
      };
      console.log(isMenuOpen)
  return (
    <>
     <div
                className="flex items-center gap-3 cursor-pointer mt-[0.15rem] py-1 transition duration-500 px-2"
                onClick={handleLogout}
              >
                <img
                  src={"/logout.png"}
                  alt={"profile"}
                  className="w-5 h-5 object-contain hover:cursor-pointer"
                  onClick={toggleMenu}
                />
                <span className="text-sm font-medium  text-gray-800">
                  Log out
                </span>
              </div>
    </>
  )
}
