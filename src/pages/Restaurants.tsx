import { CustomIcon } from "@/common";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";
import { Footers } from "@/components";
import { PageLayout } from "@/layout";
import { restaurant_grid_content } from "@/constants";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export default function Restaurants() {
  const { info, title, search, search_btn, select_option, switch_field } =
    restaurant_grid_content;

  const dispatch = useAppDispatch();
  const { restaurantData } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  const Card = ({
    img,
    name,
    des,
    region,
    popularity,
  }: {
    img: string;
    name: string;
    des: string;
    region: string;
    popularity: number;
  }) => {
    return (
      <div className="w-[320px] bg-[#ffff] shadow-md hover:shadow-lg">
        <figure>
          <img
            loading="lazy"
            src={img}
            alt={name}
            className="object-cover w-full h-[10rem]"
          />
        </figure>
        <div className="mt-5 px-6 h-[140px]">
          <h1 className="text-[#fc5b62] text-2xl font-semibold">{name}</h1>
          <p className="text-sm mt-2 text-justify">{des}</p>
        </div>
        <div className="w-full border-b-[1px] border-gray-300 py-1" />
        <div className="flex items-center justify-between px-6 my-2">
          <div className=" text-sm">
            Region: <em className="text-[#005b96]">{region}</em>
          </div>
          <div className="text-sm">
            Populairty: {popularity}{" "}
            <span className="text-yellow-500">&#9733;</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      <main>
        <div className="relative flex items-center justify-center">
          <figure>
            <img
              src="/img/herobg_restaurant_search_page.jpg"
              alt="restaurant"
              className="-mt-[12rem] h-[100vh] w-screen bg-cover"
            />
          </figure>
          <div className="absolute">
            <span className="flex w-[120px] h-[2px] bg-[#e1e1e1] mb-4">
              <em className="w-[60px] h-[2px] bg-[#e54350]" />
            </span>
            <h1 className="text-4xl text-[#fff] font-bold">{title}</h1>
          </div>
        </div>

        <ul className="bg-[#fff] py-2 px-20 shadow-md flex justify-between">
          <li className="w-fit">
            <div className="switch-field">
              <input
                type="radio"
                id="all"
                name="listing_filter"
                value="all"
                className="selected"
              />
              <label htmlFor="all">{switch_field.label1}</label>
              <input
                type="radio"
                id="popular"
                name="listing_filter"
                value="popular"
              />
              <label htmlFor="popular">{switch_field.label2}</label>
              <input
                type="radio"
                id="latest"
                name="listing_filter"
                value="latest"
              />
              <label htmlFor="latest">{switch_field.label3}</label>
            </div>
          </li>
          <li>
            <a className="btn_map relative hover:cursor-pointer">
              &nbsp; {switch_field.label4}
              <CustomIcon
                icon={switch_field.icon}
                color="gray"
                size={15}
                className="absolute top-[6px] left-[2px]"
              />
            </a>
          </li>
        </ul>

        <div className="w-full flex justify-between px-20 mt-10 h">
          <aside>
            <div className="flex flex-col gap-y-3">
              {search.map((item, id) => (
                <div className="w-fit relative" key={`${item.placeH}..${id}`}>
                  <input
                    type="text"
                    placeholder={item.placeH}
                    className="w-[280px] bg-[#fff] py-[10px] pl-4 pr-10 focus:outline-none rounded placeholder:text-gray-500 border border-gray-200"
                  />
                  <CustomIcon
                    icon={item.icon}
                    color="gray"
                    size={25}
                    className="absolute top-3 right-2"
                  />
                </div>
              ))}
              <select className="w-[280px] bg-[#fff] py-[10px] pl-4 pr-10 focus:outline-none rounded cursor-pointer text-gray-500 border border-gray-200">
                {select_option.map((item, id) => (
                  <option key={`${item}..${id}`} className="text-gray-500">
                    {item}
                  </option>
                ))}
              </select>
              <button className="w-[280px] px-6 py-2 rounded btnBg text-white">
                {search_btn}
              </button>
            </div>
          </aside>
          <div className="basis-[60%] flex justify-between">
            {restaurantData.map((item, id) => (
              <Card
                key={`${item.name}..${id}`}
                img={"/img/restaurant1.jpeg"}
                des={item.description}
                name={item.name}
                region={item.region}
                popularity={item.popularity}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between my-20 px-20 bg-[#fff] rounded">
          {info.map((item, id) => (
            <div
              className="flex flex-col items-center justify-center w-[350px] h-[250px] p-5 border-[1px] border-gray-300 hover:shadow-md hover:cursor-pointer"
              key={`${item.name}..${id}`}
            >
              <CustomIcon icon={item.icon} size={50} color="green" />
              <h1 className="my-4 font-serif text-2xl">{item.name}</h1>
              <p className="text-center">{item.des}</p>
            </div>
          ))}
        </div>
        <footer>
          <Footers />
        </footer>
      </main>
    </PageLayout>
  );
}
