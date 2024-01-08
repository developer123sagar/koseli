/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";

const SeeAll = ({
  data,
  title,
  link,

  seeAll,
  showline,
  showSeeAll,
}: {
  data: any;
  title: string;
  link: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  seeAll?: boolean;
  isFounder?: boolean;
  showline?: boolean;
  showSeeAll?: boolean;
}) => {
  return (
    <div className="flex px-4 mt-2  ">
      <div className={`w-full flex flex-col items-start  sm:items-start   r-2xl:items-start ${data.length==1 && "items-center "}`}>
        {!showline ? (
          <span className="flex w-[120px] h-[2px]   bg-[#e1e1e1]  mb-4">
            <em className="w-[60px] h-[2px] bg-[#e54350]" />
          </span>
        ) : (
          ""
        )}

        <h1 className="font-bold  text-2xl ">{title}</h1>
      </div>
      {!seeAll && data && Array.isArray(data) && data.length > 4 && (
        <div className=" flex  flex-col  justify-end items-center md:gap-4   w-20">
          <div className="">
            {!showSeeAll && (
              <div>
                <Link to={link} className="underline underline-offset-1 ">
                  See all
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeAll;
