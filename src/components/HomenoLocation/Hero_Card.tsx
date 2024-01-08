import { Home_card } from "@/constants";
import { Link } from "react-router-dom";

export default function Card() {
  const { Cards } = Home_card;
  return (
    <>
      <div className="mt-2 mx-4  ">
        <div className="flex flex-col md:flex-row  gap-6">
          {Cards.map((item, index) => (
            <div className="flex flex-col basis-full " key={index}>
              <img
                src={`/img/Home/${item.image}`}
                alt=""
                className="h-[22rem] w-full"
              />
              <h1 className="text-xl font-semibold text-center">{item.Title}</h1>
              <Link to={item.path}>
                <h2 className="text-sm text-center underline-offset-1 underline">
                  {item.Subtitle}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
