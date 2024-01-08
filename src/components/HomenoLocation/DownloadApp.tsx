import { Download } from "@/constants";

export default function DownloadApp() {
  return (
    <>
      <div className="mt-10  h-[520px] md:h-[600px] relative w-full">
        <div className="absolute inset-0">
          <div className="flex  items-center justify-center gap-2 md:mx-20 mt-10">
            <div className="w-full px-4 lg:w-6/12">
              <h1 className="text-black font-semibold text-[24px] md:text-xl mb-3">
                Get Your own Online <br /> Food Ordering App and Website
              </h1>
              <p className="mt-4 text-[#696969] text-base text-justify mb-4">
                "Seamlessly incorporate our restaurant's online ordering system
                to embrace the future. Our robust online ordering software is
                designed to meet your needs with excellence."
              </p>
              {Download.map((item, index) => (
                <div className="flex gap-4 mb-2" key={index}>
                  <h1 className="flex items-center justify-center rounded-full border  text-red-600 font-bold">
                    <img
                      loading="lazy"
                      src="/Success.png"
                      alt={item.title}
                      className="w-5"
                    />
                  </h1>
                  <li className="list-none text-black font-semibold text-base">
                    {item.title}
                  </li>
                </div>
              ))}
              <div className="flex gap-4 mt-4">
                <button className="px-2 flex items-center  gap-3 h-12 w-[130px] bg-white admin-header opacity-90 text-black font-bold rounded">
                  <img
                    src="/img/Home/GooglePlay.png"
                    alt="googleplay"
                    className="w-6 "
                  />

                  <span className="flex flex-col ">
                    <span className="text-[12px]">Google Play</span>
                  </span>
                </button>
                <button className="px-2 flex items-center gap-3 h-12 w-[130px] admin-header opacity-90 text-black bg-white font-bold rounded">
                  <span className="icon">
                    <svg
                      fill="currentcolor"
                      viewBox="-52.01 0 560.035 560.035"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
                      </g>
                    </svg>
                  </span>

                  <span className="flex flex-col">
                    <span className="text-[12px]">App Store</span>
                  </span>
                </button>
              </div>
            </div>

            <div className="relative md:block hidden   rounded-2xl w-full px-4 lg:w-6/12 xl:w-5/12 scroll-image">
              <div className="relative flex items-center  justify-center">
                <img
                  src="../img/Home/phone.png"
                  alt=""
                  className="object-center"
                />
                <div className="absolute">
                  <img
                    loading="lazy"
                    src="/logo.png"
                    alt="logo"
                    className="lg:w-24 sm:w-[3rem] "
                  />
                </div>
              </div>
            </div>

            <div className="relative md:block hidden rounded-2xl w-full px-4 lg:w-6/12 xl:w-5/12 scroll-image">
              <div className="relative flex items-center justify-center">
                <img
                  src="../img/Home/phone.png"
                  alt=""
                  className="object-center"
                />
                <div className="absolute">
                  <img
                    loading="lazy"
                    src="/logo.png"
                    alt="logo"
                    className="lg:w-24 sm:w-[4rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
