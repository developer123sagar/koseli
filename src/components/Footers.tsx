import { Footer_content } from "@/constants";
import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <>
      <footer className="w-full items-center justify-center relative  admin-header mt-5 hidden r-lg:block overflow-x-hidden">
        <div className="relative flex items-center justify-center">
          <img
            loading="lazy"
            src="/loader.gif"
            alt="koseli"
            className="w-[20rem] r-3xl:w-[25rem]   "
          />
          <span className="absolute font-bold text-2xl  text-[#e01f2d]">
            <img
              loading="lazy"
              src="/logo.png"
              alt="koseli"
              className="md:w-20 w-6"
            />
          </span>
        </div>
        <p className="absolute border-t-[4px]  border-[#26d318] top-[50%] font-bold left-[62.6%] w-full" />
        <p className="absolute border-t-[4px] border-[#26d318] top-[50%] right-[62.6%] w-full" />

        {/* top left */}
        <div className="absolute md:top-10 left-10 md:w-[470px]">
          <div className="flex flex-col md:flex-row gap-3 md:gap-8  flex-wrap ">
            {Footer_content.quick_link.quickLinks.map((cont, i) => (
              <Link
                key={cont.name + i}
                to={cont.path}
                className={`hover:underline font-bold`}
              >
                {cont.name}
              </Link>
            ))}
          </div>
        </div>

        {/* top right */}
        <div className="absolute top-10 right-2 md:w-[470px]  w-full mx-0 ">
          <div className="flex flex-col mx-0  ">
            <h1
              className="text-3xl  mb-4"
              style={{ fontFamily: "Times New Roman" }}
            >
              Subscribe NewsLetter
            </h1>
            <div className="relative w-full md:w-[80%] r-sm:w-full   admin-header">
              <input
                type="text"
                className="w-full form-control border  admin-header  rounded pl-5 pr-3 h-[50px]"
                placeholder="Enter email..."
              />
              <button className=" absolute text-white shadow  inset-y-0 right-0 top-0 bottom-0 font-bold px-3 py-2 bg-[#e01f2d] focus:outline-none pl-5 pr-5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* bottom left */}
        <div className="absolute bottom-30 left-10  w-[470px]">
          <div className="flex gap-10 text-md font-bold">
            <Link to="/about"> About </Link>
            <Link to="/help"> Help </Link>
          </div>
        </div>

        {/* bottom right */}
        <div className="absolute bottom-10  right-10 w-[470px]  flex gap-1"></div>
      </footer>

      <footer className="w-full items-center justify-center relative  admin-header mt-5 r-lg:hidden overflow-x-hidden">
        <div className="relative flex items-center justify-center">
          <img
            loading="lazy"
            src="/loader.gif"
            alt="koseli"
            className="w-[15rem] "
          />
          <span className="absolute font-bold text-2xl  text-[#e01f2d]">
            <img loading="lazy" src="/logo.png" alt="koseli" className="w-15" />
          </span>
        </div>
        <p className="absolute border-t-[4px]  border-[#26d318] top-[50%] font-bold left-[75.6%] w-full" />
        <p className="absolute border-t-[4px] border-[#26d318] top-[50%] right-[75.6%] w-full" />

        {/* top left */}
        <div className="mt-20 left-10">
          <div className="flex justify-center gap-3 md:gap-8  flex-wrap ">
            {Footer_content.quick_link.quickLinks.map((cont, i) => (
              <Link
                key={cont.name + i}
                to={cont.path}
                className={`hover:underline font-bold`}
              >
                {cont.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-5 gap-8">
          <Link to="/about" className={`hover:underline font-bold`}>
            {" "}
            About{" "}
          </Link>
          <Link to="/help" className={`hover:underline font-bold`}>
            {" "}
            Help{" "}
          </Link>
        </div>

        {/* top right */}
        <div className="w-full mt-15 text-center ">
          <div className="flex justify-center flex-col pl-10 pr-10 sm:pl-20 sm:pr-20">
            <h1 className="mb-4" style={{ fontFamily: "Times New Roman" }}>
              Subscribe NewsLetter
            </h1>
            <div className="relative admin-header  ">
              <input
                type="text"
                className="w-full form-control border  admin-header  rounded pl-5 py-4 pr-3"
                placeholder="Enter email..."
              />
              <button className=" absolute text-white shadow inset-y-0 right-0 bottom-0 top-0 font-bold px-3 py-2 bg-[#e01f2d] focus:outline-none pl-5 pr-5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>

      <div className="logoContainer--footer md:mx-20 mt-10 md:mt:0 mb-2">
        <div className="flex flex-col md:flex-row   items-center justify-between">
          <h5 className="  w-full md:w-[20%] text-center">
            Copyright ©Koseli Pvt.Ltd.
          </h5>
          <div className="relative text-center  flex flex-col items-center">
            <img src="/silicon.png" className="h-20 w-20 object-contain" loading="lazy" />
          </div>
          <div className="tosAndPP flex">
            <Link to="/footer/terms">
              <h5 className="mr-10 pointer"> Terms of services </h5>
            </Link>
            <Link to="/footer/privacypolicy">
              <h5 className="pointer"> Privacy policy </h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footers;
