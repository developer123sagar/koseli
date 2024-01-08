import { AboutData } from "@/data";
import { CustomIcon } from "@/common";

export default function Card() {
  return (
    <>
      <section className="md:mt-10 mt-6   mb-4 ">
        <div>
          <span className="flex w-[120px] h-[2px]  bg-[#e1e1e1] mt-3 md:mt-6 mx-auto mb-4">
            <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
          </span>
          <h1 className="text-center h1 text-[#333] font-bold mt-2 text-xl md:text-3xl">
            Why Choose Koseli
          </h1>
          <p className="text-center  pb-4 font-light text-2xl">
            Koseli is a food delivery services
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-6 items-center  justify-center p-2 mb-10">
          {AboutData.map((item, i) => (
            <div
              className="w-full md:w-[40%] sm:w-[40%] lg:w-[30%]    "
              key={i}
            >
              <div className=" h-72 admin-header  md:h-80 lg:h-72 sm:h-96   ">
                <div className="flex flex-col items-center justify-center pt-10 pb-10 pr-4 pl-4  ">
                  <CustomIcon size={60} color="red" icon={item.icon} />
                  <h3 className="text-[16px] mt-4 mb-1 font-semibold ">
                    {item.name}
                  </h3>
                  <p className="font-[1rem] text-[#666] text-center  ">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className=" mt-20 mb-20">
          <div>
            <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
              <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
            </span>
            <h1 className="h1 text-center h1 text-[#333] mt-6 text-3xl">
              Our Origins and Story
            </h1>
            <p className=" text-center pb-10 font-light text-2xl">
              our story origin{" "}
            </p>
          </div>
          <div className="flex gap-10 flex-col md:flex-row mx-10  ">

            <div className="  h-[16rem]  basis-[50%] marquee slide-in">
           
              <img loading="lazy" src="/img/About/Origin.png" alt="img" className="object-cover h-[22rem] w-full " />
            </div>
        

            <div className=" flex-1 h-[16rem]  ">
              <p className="p text-justify text-[#555] text-base leading-6 font-poppins ">
              <span className="font-semibold" >A food delivery system </span>like  is an online platform and mobile application that simplifies the process of ordering food from local restaurants and having it delivered to your doorstep. It serves as a bridge between customers and eateries, offering a seamless and convenient way to enjoy a wide variety of cuisines without the need to dine in at a restaurant.  <br/>Customers typically start by creating an account on the platform, providing their details like name, address, and payment information. Once registered, they can explore a curated list of nearby restaurants, each featuring a detailed menu with item descriptions, prices, and customer ratings .
              <br/><span>
              In addition to ordering food, customers can also leave reviews and ratings for restaurants 
              </span>
              </p>
              <h1 className="text-gray-500 italic">Ceo:sudiksha </h1>
            </div>
          </div>
        </div> */}
        <div className=" mt-10  h-auto   bg-[#dce1e14d]">
          <div className="flex sm:flex-col md:flex-row md:gap-10 gap-1 flex-col md:mx-10 mx-3 h-auto md:p-[3%]  ">
            <div className="  flex-1   h-[16rem] md:h-[20rem] lg:h-[16rem]">
              <div>
                <h1 className="text-[#333333] font-bold mt-2 md:mt-0 mb-2">
                  Vision
                </h1>
                <p className=" text-justify text-black text-[14px] md:text-[17px] font-poppins ">
                  For food lovers who want to order food from local restaurants
                  online, the Food Ordering System will be an Internet-based
                  application that will accept individual or group meal orders,
                  process payments, and trigger delivery of the prepared meals
                  to a designated location. For Restaurant owner who wants to
                  take and grow their business online, with low budget can start
                  their online restaurant business.
                </p>
              </div>
            </div>
            <div className="hidden  sm:hidden  md:hidden lg:block  h-[16rem]  basis-[30%] ">
              <img
                src="/img/About/Origin.png"
                alt="img"
                className="object-cover h-full   w-full  "
              />
            </div>
            <div className=" flex-1 h-[16rem]  md:mt-2 mb-2 md:mb-0 ">
              <h1 className="text-[#333333] font-bold mb-2 ">Mission</h1>
              <p className="text-justify text-black  text-[14px] md:text-[17px] font-poppins ">
                We are fast growing online food ordering portal. We aim that
                even small restaurant business can take their business online
                without any cost. Thousands of restaurants are registered with
                Foodchow and many more will be registered soon, which ensure
                that every customer of Foodchow will get wide range of food and
                can choose favourite food from nearby restaurant. In one year
                Foodchow has reached to 5+ countries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
