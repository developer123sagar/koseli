import { PageLayout } from "@/layout";
import { FaqComponent, Footers } from "@/components";
export default function Faq() {
  return (
    <>
      <PageLayout>
        <div className="relative flex items-center justify-center">
          <img
            src=""
            alt=""
            className="  w-full h-[20rem] md:h-[20rem]  object-cover  "
          />
          <div className="absolute ">
            <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
              <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
            </span>
            <h1 className="w-fit mx-auto font-bold text-4xl mb-2">Faq</h1>
          </div>
        </div>
        <FaqComponent />
        <Footers />
      </PageLayout>
    </>
  );
}
