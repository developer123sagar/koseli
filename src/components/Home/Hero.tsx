import { Link } from "react-router-dom";
import { PageLayout } from "@/layout";
interface HomeProp {
  setSearchParam: (newValue: string) => void;
}

export default function Hero(prop: HomeProp) {

  return (
    <div> 
      <PageLayout>
        <div className="relative">
          <img
            src="/img/Home_Banner.jpeg"
            alt="banner"
            className="w-full h-[38rem] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full ">
              <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
                <em className="w-[60px] h-[2px] bg-[#eb0029] mx-auto" />
              </span>
              <h1 className="w-fit mx-auto text-white font-bold text-4xl mb-2">
                Order food now !
              </h1>
              <p className="text-bold md:text-3xl text-lg    text-white">
                Delicious Meals Delivered to Your Doorstep{" "}
              </p>
              <div className="hidden lg:block">
                <div className="flex justify-center items-center md:block mt-5 w-[100%]">
                  <input
                    type="text"
                    className="border border-gray-300 p-2 bg-white focus:outline-none mt-5 w-[60%]"
                    placeholder="Food,Restaurant...."
                    onChange={(e) => {
                      prop.setSearchParam(e.target.value);
                    }}
                  />
                  <Link to="/search/noId">
                    <button className="bg-[#eb0029] w-32 p-2 h-[43px] text-white">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
              <div className="block lg:hidden pt-10">
                <input
                  type="text"
                  className="border border-gray-300 p-2 bg-white focus:outline-none w-[65%]"
                  placeholder="Hotel, city... when, ask a question"
                />
                <Link to="">
                  <button className="bg-[#eb0029] w-32 p-2 text-white">
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
