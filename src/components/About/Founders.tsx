// import Slider from "react-slick";
// import { Founders } from "@/data";
import { useEffect} from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
// import { baseImgUrl } from "@/routes";
import { IFounder } from "@/types";
import { baseImgUrl } from "@/routes";



export default function Founder_Image() {
  const dispatch = useAppDispatch();

  const data: IFounder[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "founder" }));
  }, [dispatch]);
  console.log(data);

  // const settingsOne = {
  //   slidesToShow: Founders.length > 1 ? 1 : Founders.length,
  //   dots: true,
  //   arrows: true,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 1000,
  //   autoplaySpeed: 4000,
  //   infinite: true,
  //   cssEase: "linear",
  // };

  // const settingsTwo = {
  //   slidesToShow: Founders.length > 1 ? 1 : Founders.length,
  //   dots: true,
  //   arrows: true,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 1000,
  //   autoplaySpeed: 4000,
  //   infinite: true,
  //   cssEase: "linear",
  // };

  // const settingsThree = {
  //   slidesToShow: Founders.length > 1 ? 1 : Founders.length,
  //   dots: true,
  //   arrows: true,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 1000,
  //   autoplaySpeed: 4000,
  //   infinite: true,
  //   cssEase: "linear",
  // };

  // const settingsFour = {
  //   slidesToShow: 1,
  //   dots: true,
  //   arrows: true,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 1000,
  //   autoplaySpeed: 4000,
  //   infinite: true,
  //   cssEase: "linear",
  // };

  return (
    <>
      {/* <div classNameName=" sm:mt-[19rem]  mt-1 md:mt-6">
        <span classNameName="flex w-[120px] h-[2px]  bg-[#e1e1e1]  mx-auto ">
          <em classNameName="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
        </span>
        <h1 classNameName="text-center h1 text-[#333] mt-6 text-3xl">
          Our Founders
        </h1>
        <p classNameName="text-center  pb-10 font-light text-2xl">
          "Inspirational founder shaping our future.".
        </p>

        <div classNameName="app ">
          <div classNameName="xlSlider--comboOffers">
            <Slider {...settingsOne}>
              {Array.isArray(data) && data.length > 0
                ? data.map((item, i) => (
                    <div key={i} classNameName="p-4 relative h">
                      <img
                        src={`${baseImgUrl}/${item.image[0]}`}
                        alt={`${item.name}`}
                        classNameName="w-full  h-[400px]"
                      />
                      <div classNameName="absolute bottom-2 flex text-center flex-col text-sm test-white items-center  bg-white  justify-center   opacity-80 w-full h-20">
                        <p classNameName="text-black  opacity-100 z-2 font-bold ">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))
                : []}
            </Slider>
          </div>
          <div classNameName="lgSlider--comboOffers">
            <Slider {...settingsTwo}>
              {Array.isArray(data) && data.length > 0
                ? data.map((item, i) => (
                    <div key={i} classNameName="p-4 relative">
                      <img
                        src={`img/About/${item.image}`}
                        alt={`img${i}`}
                        classNameName="w-full  h-[400px]"
                      />
                      <div classNameName="absolute bottom-2 flex text-center flex-col text-sm test-white items-center  bg-white  justify-center   opacity-80 w-full h-20">
                        <p classNameName="text-black opacity-100 z-2 font-bold ">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))
                : []}
            </Slider>
          </div>
          <div classNameName="mdSlider--comboOffers flex justify-center">
            <Slider {...settingsThree}>
              {Array.isArray(data) && data.length > 0
                ? data.map((item, i) => (
                    <div key={i} classNameName="p-4 relative">
                      <img
                        src={`img/About/${item.image}`}
                        alt={`img${i}`}
                        classNameName="w-full  h-[400px]"
                      />
                      <div classNameName="absolute bottom-2 flex text-center flex-col text-sm test-white items-center  bg-white  justify-center   opacity-80 w-full h-20">
                        <p classNameName="text-black opacity-100 z-2 font-bold ">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))
                : []}
            </Slider>
          </div>
          <div classNameName="smSlider--comboOffers">
            <Slider {...settingsFour}>
              {Array.isArray(data) && data.length > 0
                ? data.map((item, i) => (
                    <div key={i} classNameName="p-4 relative">
                      <img
                        src={`img/About/${item.image}`}
                        alt={`img${i}`}
                        classNameName="w-full  h-[400px]"
                      />
                      <div classNameName="absolute bottom-2 flex text-center flex-col text-sm test-white items-center  bg-white  justify-center   opacity-80 w-full h-20">
                        <p classNameName="text-black opacity-100 z-2 font-bold ">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))
                : []}
            </Slider>
          </div>
        </div>
      </div> */}
      <section className="pb-1  ">
        <div className=" flex flex-col  mx-auto">
          <div className="-mx-4  ">
            <div className="w-full  mt-6  px-4">
              <div className="mx-auto mb-[20px]  text-center">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Team
                </span>
                <h2 className="mb-3 text-xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Awesome Team
                </h2>
                <p className="text-base text-body-color ">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

       
      <div   className="overflow-x-scroll whitespace-nowrap flex scroll-smooth scrollbar-hide ">
    
          {Array.isArray(data) && data.length > 0
            ? data.map((item, i) => (
            
                <div key={i} className="w-[calc(100vw - 4rem)] md:w-[22rem] px-4 flex gap-10" >
                  <div className="mx-auto mb-10 w-[20rem] md:w-[22rem]  ">
                    <div className="mx-auto mb-10 w-full  ">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                         src={`${baseImgUrl}/${item.image}`}
                          alt="founder"
                          className="md:w-[22rem] h-[20rem] md:h-[29rem] w-full object-cover"
                        />
                        <div className="absolute bottom-5 left-0 w-full text-center ">
                          <div className="relative mx-5 overflow-hidden h-20 rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                            <h3 className="text-base font-semibold text-dark dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-xs text-body-color dark:text-dark-6">
                              {item.extra}
                            </p>
                            <div>
                              <span className="absolute bottom-0 left-0">
                                <svg
                                  width="61"
                                  height="30"
                                  viewBox="0 0 61 30"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="16"
                                    cy="45"
                                    r="45"
                                    fill="#e01f2d"
                                    fill-opacity="0.11"
                                  />
                                </svg>
                              </span>
                              <span className="absolute right-0 top-0">
                                <svg
                                  width="20"
                                  height="25"
                                  viewBox="0 0 20 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="0.706257"
                                    cy="24.3533"
                                    r="0.646687"
                                    transform="rotate(-90 0.706257 24.3533)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="6.39669"
                                    cy="24.3533"
                                    r="0.646687"
                                    transform="rotate(-90 6.39669 24.3533)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="12.0881"
                                    cy="24.3533"
                                    r="0.646687"
                                    transform="rotate(-90 12.0881 24.3533)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="17.7785"
                                    cy="24.3533"
                                    r="0.646687"
                                    transform="rotate(-90 17.7785 24.3533)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="0.706257"
                                    cy="18.6624"
                                    r="0.646687"
                                    transform="rotate(-90 0.706257 18.6624)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="6.39669"
                                    cy="18.6624"
                                    r="0.646687"
                                    transform="rotate(-90 6.39669 18.6624)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="12.0881"
                                    cy="18.6624"
                                    r="0.646687"
                                    transform="rotate(-90 12.0881 18.6624)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="17.7785"
                                    cy="18.6624"
                                    r="0.646687"
                                    transform="rotate(-90 17.7785 18.6624)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="0.706257"
                                    cy="12.9717"
                                    r="0.646687"
                                    transform="rotate(-90 0.706257 12.9717)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="6.39669"
                                    cy="12.9717"
                                    r="0.646687"
                                    transform="rotate(-90 6.39669 12.9717)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="12.0881"
                                    cy="12.9717"
                                    r="0.646687"
                                    transform="rotate(-90 12.0881 12.9717)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="17.7785"
                                    cy="12.9717"
                                    r="0.646687"
                                    transform="rotate(-90 17.7785 12.9717)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="0.706257"
                                    cy="7.28077"
                                    r="0.646687"
                                    transform="rotate(-90 0.706257 7.28077)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="6.39669"
                                    cy="7.28077"
                                    r="0.646687"
                                    transform="rotate(-90 6.39669 7.28077)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="12.0881"
                                    cy="7.28077"
                                    r="0.646687"
                                    transform="rotate(-90 12.0881 7.28077)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="17.7785"
                                    cy="7.28077"
                                    r="0.646687"
                                    transform="rotate(-90 17.7785 7.28077)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="0.706257"
                                    cy="1.58989"
                                    r="0.646687"
                                    transform="rotate(-90 0.706257 1.58989)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="6.39669"
                                    cy="1.58989"
                                    r="0.646687"
                                    transform="rotate(-90 6.39669 1.58989)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="12.0881"
                                    cy="1.58989"
                                    r="0.646687"
                                    transform="rotate(-90 12.0881 1.58989)"
                                    fill="#e01f2d"
                                  />
                                  <circle
                                    cx="17.7785"
                                    cy="1.58989"
                                    r="0.646687"
                                    transform="rotate(-90 17.7785 1.58989)"
                                    fill="#e01f2d"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              ))
            : [<h1 className="text-center flex justify-center items-center  w-full">No Founder added</h1>]}
            </div>
        </div>
      </section>
    </>
  );
}
