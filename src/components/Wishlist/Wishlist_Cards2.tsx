import { Wishlist_Card2 } from "@/data";

export default function Wishlist_Cards2() {
  return (
    <>
      <section className="mt-6 mb-6 ">
        <div className=" flex flex-wrap gap-10   justify-center  mb-6 mt-6">
          {Wishlist_Card2.map((item, index) => (
            <div
              key={index}
              className="block px-10 w-[20rem] h-[14rem]   rounded admin-header"
            >
              <div className="flex flex-col items-center mt-6">
                <img
                  loading="lazy"
                  src={`/img/About/${item.Image}`}
                  alt=""
                  className="h-12 w-12"
                />
                <h1 className="h1  text-center h-12">{item.Title}</h1>
                <p className="p text-justify">{item.SubTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
