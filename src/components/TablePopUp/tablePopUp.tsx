import { Dispatch, SetStateAction } from "react"
import { baseImgUrl } from "@/routes"

interface TablePopUpProps{
    image:string
    showTable:boolean
    setShowTable:Dispatch<SetStateAction<boolean>>
    tableBookedId:string[]
    setTableBookedId:Dispatch<SetStateAction<string[]>>
    tableId:string
    tableBookSeats:number
    totalSeats:number
    setTotalSeats:Dispatch<SetStateAction<number>>
}

const TablePopUp=(prop:TablePopUpProps)=>{
    return(
        <div className={`fixed top-[100px] right-[30%] left-[30%] p-10 border border-solid border-gray-200 ${!prop.showTable &&'hidden'} bg-white`}>
            <div className="w-full h-[400px] bg-cover" style={{backgroundImage:`url(${baseImgUrl}/${prop.image})`}}/>
            <h5 className=" font-bold  mt-5"> Total capacity : {prop.tableBookSeats} </h5>
            <button className="p-3 bg-[#228552] hover:bg-[#32a067] text-white w-full font-extrabold mt-5" onClick={()=>{
                const arrData=[...prop.tableBookedId];
                if(!arrData.includes(prop.tableId)){
                    arrData.push(prop.tableId);
                    const number=prop.tableBookSeats+prop.totalSeats;
                    prop.setTotalSeats(number);
                }
                prop.setTableBookedId(arrData);
                
                prop.setShowTable(false);
            }}> Select Table </button>
            <button className="p-3 bg-[#b82d23] hover:bg-[#e0392d] text-white w-full font-extrabold mt-2" onClick={()=>{
                const arrData=[...prop.tableBookedId];
                if(arrData.includes(prop.tableId)) {
                    const filteredData=arrData.filter(data=>data!== prop.tableId); 
                    prop.setTableBookedId(filteredData);
                    const number=prop.totalSeats-prop.tableBookSeats;
                    prop.setTotalSeats(number);
                };
                prop.setShowTable(false)
            }}> Deny Table</button>

        </div>
    )
}

export default TablePopUp;