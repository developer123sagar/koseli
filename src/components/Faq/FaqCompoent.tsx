import { useState } from "react";
import { Faq, Faq_Content } from "@/data";
import { IoIosArrowForward } from "react-icons/io";

export default function FaqCompoent() {

  const { payment, suggestion, Recommendation, TermsCondition, Booking } = Faq_Content;
  const customCss = `w-full admin-header sticky rounded h-16 flex-col mt-2 px-4 cursor-pointer font-semibold text-[#999]`;

  type Details = {
    title: string;
    des: string;
  }
  type CardProps = {
    heading: string;
    details: Details[];
  };
  const Card: React.FC<CardProps> = ({ heading, details }) => {
    const [show, setShow] = useState<string | null>(null);

    const handleItemClick = (itemTitle: string) => {
      if (show === itemTitle) {
        setShow(null);
      } else {
        setShow(itemTitle);
      }
    };
    return (
      <div className="">
        <p className="h1">{heading}</p>
        {details.map((item) => (
          <div key={`${item.title}`} className={`${customCss}`}>
            <h1 className="  h-full  items-center  flex" onClick={() => handleItemClick(item.title)}>{item.title}</h1>
            {show === item.title && (<h2>{item.des}</h2>)}
          </div>
        ))}
      </div>

    );
  };

  return (

    <>
      <div className="mt-6 mb-6 flex mx-10 gap-10 ">
        <div className="flex flex-col gap-3 px-2 py-4 w-[20rem] h-[12rem] mt-28 cursor-pointer  rounded admin-header">
          {Faq.map((item, index) => (
            <div className=" flex  justify-between items-center " key={index}>
              <div className="flex gap-4  ">
                <img
                  src={`/img/${item.image}`}
                  alt=""
                  className="h-6 w-6  opacity-75"
                />
                <h1 className="text-[#3a3838]  ">{item.name}</h1>
              </div>
              <IoIosArrowForward color={"#999"} />
            </div>
          ))}
        </div>

        <div className="flex flex-col   gap-10 w-full ">
          <Card heading={payment.heading} details={payment.intro} />
          <Card heading={suggestion.heading} details={suggestion.intro} />
          <Card heading={Recommendation.heading} details={Recommendation.intro} />
          <Card heading={TermsCondition.heading} details={TermsCondition.intro} />
          <Card heading={Booking.heading} details={Booking.intro} />
          {/* <Card heading={payment.heading}  /> */}
        </div>
      </div>
    </>
  );
}
