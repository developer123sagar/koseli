import { CustomIcon } from "@/common";
import { Help_Card } from "@/data";

export default function Help_card() {

  return (
  
    <>
    <section className="mt-6 mb-6 ">
      <div>
        <div>
        <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
                <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
                </span>
          <h1 className="text-center font-bold h1">Select a Topic</h1>
          <p className="text-center p">Koseli is a food delivery service</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center  justify-center mb-10">
          {Help_Card.map((item,i)=>(
             <div className=" md:w-[30%] w-full h-72  "key={i}>
            <div className=" h-72 admin-header   " >
              <div className="flex flex-col items-center justify-center pt-10 pb-10 pr-4 pl-4  ">
              <CustomIcon size={60} color="red" icon={item.icon} />
            <h3 className="text-[16px] mt-4 mb-2 font-semibold">{item.name}</h3>
            <p className="font-[1rem] text-[#666] text-center">{item.description}</p>
            <div></div>
            </div>
          
        
          </div>
         
        
         
          </div> ))}
          </div>
      </div>

  
      </section>
    </>
  );
}
