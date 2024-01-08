import { BsCurrencyRupee } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import { BsFillBagFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Bar,
  BarChart,
} from "recharts";

import TitleFormat from "@/dashboard/component/TitleFormat/TitleFormat";
import { HiOutlineTicket } from "react-icons/hi2";

export default function Dashboard_Home() {
  // Check if UserData is defined, and use an empty array as a fallback
  // const [userData, setUserData] = useState(
  //   UserData
  //     ? {
  //         labels: UserData.map((data) => data.year),
  //         datasets: [
  //           {
  //             label: "Users ",
  //             data: UserData.map((data) => data.Total_Customer),
  //           },
  //         ],
  //       }
  //     : {
  //         labels: [],
  //         datasets: [
  //           {
  //             label: "Total Cutsomer",
  //             data: [],
  //           },
  //         ],
  //       }
  // );6

  return (
    <>
       <div className="dashboard flex mt-5  ">
          <div className="w-1 md:w-1/3 p-5 text-black">
            <div className="bg-white rounded-md p-7">
              <h1 className="text-[rgb(110,110,110)] text-[15px] font-bold mb-2">
                {" "}
                Order statistics{" "}
              </h1>
              <div className="flex justify-evenly font-bold pb-5">
                <div>
                  <h1 className="text-center mt-2 mb-2 font-bold"> 0 </h1>
                  <h1 className="text-[rgb(150,150,150)] text-[15px]">
                    {" "}
                    Pending{" "}
                  </h1>
                </div>
                <div>
                  <h1 className="text-center mt-2 mb-2 font-bold"> 0 </h1>
                  <h1 className="text-[rgb(150,150,150)] text-[15px]">
                    {" "}
                    Completed{" "}
                  </h1>
                </div>
                <div>
                  <h1 className="text-center mt-2 mb-2 font-bold"> 0 </h1>
                  <h1 className="text-[rgb(150,150,150)]  text-[15px]">
                    {" "}
                    Cancelled{" "}
                  </h1>
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                <div className="bg-[#631418]  p-3 rounded-md">
                  <BsFillBagFill className="text-white text-[30px]" />
                </div>
                <div>
                  <h5 className="text-[rgb(110,110,110)] font-bold text-[15px]">
                    {" "}
                    Total orders:{" "}
                  </h5>
                  <h1> 0 </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1 md:w-1/3 p-5 text-white">
            <div className="bg-[#631418] rounded-md p-10 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-[60px] font-bold"> 90 </h1>
                  <h1 className="text-[20px] font-bold">
                    {" "}
                    Total&nbsp;Deliveries{" "}
                  </h1>
                </div>
                <IoFastFoodSharp className="icon--dashboard" />
              </div>
            </div>
          </div>
          <div className="w-1 md:w-1/3 p-5 text-white">
            <div className="bg-[#631418] rounded-md p-10 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-[60px] font-bold"> 100 </h1>
                  <h1 className="text-[20px] font-bold"> Total&nbsp;Earned </h1>
                </div>
                <BsCurrencyRupee className="icon--dashboard" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 p-5 pt-1">
            <div className="bg-white  p-10 rounded-md ">
              <BarChart margin={{ left: 0 }} width={330} height={340}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" fill="#631418" />
              </BarChart>
            </div>
          </div>
          <div className="w-2/3 p-5">
            <div className="bg-white  p-10 rounded-md ">
              <LineChart width={700} height={340}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#631418"
                  strokeWidth={5}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#dd8767"
                  strokeWidth={5}
                />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="bg-[#fafafa] rounded-md mt-6 flex gap-10  mx-4  ">
          <div className="basis-[60%]  bg-white rounded  mb-10">
            <TitleFormat title={"Recent food"} />
            <div className="flex gap-36   h-auto items-center mb-4  p-10">
              <figure>
                <img
                  src=""
                  alt="Recent Food"
                  className="w-40 h-40 border border-gray-400"
                />
              </figure>
              <h1 className="flex items-center font-bold">Promotion </h1>
              <h1 className="h-14 bg-red-300 rounded-full w-14 flex items-center justify-center">
                <FiUsers color="black" />
              </h1>
              <h1 className="h-14 bg-red-300 rounded-full w-14 flex items-center justify-center">
                <HiOutlineTicket color="black" />
              </h1>
            </div>
          </div>
          <div className="bg-white  w-full h-20 mb-4 ">
            <TitleFormat title={"Completed"} />
          </div>
        </div>
        {/* calendarpart */}
        
        <div className="flex gap-10 mx-2  "> 
        <div className="bg-white  w-full h-20 mb-4 basis-[60%]">
            <TitleFormat title={"Choose Place"} />
            <iframe
            title="sasurali map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8702323225525!2d85.37132407556038!3d27.690405376192324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b4677f70b01%3A0xa8f25b94bc35b5b2!2zU2FzdXJhbGkgUmVzdHJvIOCkuOCkuOClgeCksOCkvuCksuClgA!5e0!3m2!1sen!2snp!4v1692270845431!5m2!1sen!2snp"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
          <div className="bg-white  w-full h-20 mb-4  basis-[40%] ">
          <Calendar className="customCalendar rounded-sm"/>
          </div>
      
        </div>
    </>
  );
}
