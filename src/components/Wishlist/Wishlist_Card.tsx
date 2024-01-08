import { Wishlist_Cards } from "@/data";
import {AiFillHeart} from "react-icons/ai";

export default function Wishlist_Card() {
  return (
<>
<div className="flex flex-wrap justify-center gap-10 mb-6 mt-6  bg-slate-300 ">
{Wishlist_Cards.map((item,index)=>
(<div className=" h-[430px] w-[340px]  admin-header mt-6 mb-6" key={index}>
   
   <figure className="w-full h-[210px] relative">
  <img
    src=""  // Replace with your actual image source
    alt="Wishlist"
    className="w-full h-full object-cover bg-slate-100"
  />
  <div className="absolute top-0 left-0 w-full h-full flex  justify-between mt-6 ">
    <h1 className="text-[16px] font-bold bg-slate-200 rounded-sm  w-24 h-8  items-center text-center text-black ml-4">Your Title</h1> 
    <p className="text-xl text-red-400 bg-slate-200 p-2 w-8 h-8 text-center rounded-sm mr-4"><AiFillHeart/></p>
  </div>
</figure>

<div className="mx-10">
<h1 className="h1"> {item.Title}</h1>
<p className="p">{item.SubTitle}</p>
<p>FROM <span className="text-green-600 font-semibold">{item.Price}</span>/per person </p>
</div>
<div className="w-full h-[2px] bg-gray-200"/>
<div className="flex justify-between mx-4">
 <h1>Time:</h1>
 <p>20:35</p>
</div>
 </div>))}
 </div>


</>
  )
}
