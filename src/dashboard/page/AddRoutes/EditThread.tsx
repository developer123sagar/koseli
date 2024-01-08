import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function EditThread() {
  const heading = "text-[black] font-semibold text-[14px] mb-2";
  const input =
    "bg-white border border-gray-300 rounded w-full h-40 flex-start  hover:border-blue-400 focus:outline-none "; 

  return (
    <>
      <div className="mt-10 mb-4 ">
          <h1 className="font-bold flex items-center gap-2 justify-center text-stone-950 text-2xl mb-4">
            <AiOutlineArrowLeft size={20} className="text-[20px]" />
            Add Community Form
          </h1>
          <form>
            <div className="flex justify-center   ">
              <div className="bg-red-400 border rounded-lg w-[40rem] p-6 h-auto  admin-header">
                <div className="">
                  <h1 className={`${heading}`}> Thread Question</h1>
                  <textarea
                    className={`${input}`}
                    name="description"
                    rows={1}
                    // onChange={handleChange}
                    cols={10}
                  />
                </div>
                <div className="mt-6 flex justify-end gap-10 mb-2">
                  <Link to="">
                    <button className="border rounded-xl bg-[#5783db] font-semibold w-24 p-2 text-center text-white">
                      Save
                    </button>
                  </Link>
                  <Link to="">
                    <button className="border rounded-xl font-semibold bg-[#5783db] w-24 p-2 text-center text-white">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
    </>
  );
}
