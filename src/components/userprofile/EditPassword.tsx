import Buttons from "@/common/Button";

export default function EditPassword() {
  return (
    <>
      <div className="flex items-center h-[100vh] justify-center">
        <div className="">
          <h1 className="text-[40px] pt-4 w-96 rounded font-bold"> Password</h1>
          <p className="text-[20px] mb-3 mt-3">
            Your password must be at least 8 character long and contain <br />{" "}
            at least one letter and one digit .
          </p>
          <form>
            <div>
              <div>
                <label htmlFor="" className="font-bold text-[24px]">
                  New Password
                </label>
                <br />
                <div>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="border bg-gray-100 w-[32rem] px-10  font-bold text-center text-[28px] p-3 text-black rounded"
                  />
                </div>
                <br />
                <label htmlFor="" className="font-bold text-[24px] pt-4">
                  Confirm New Password
                </label>
                <br />
                <input
                  type="password"
                  name=""
                  id=""
                  className="border bg-gray-100 w-[32rem] px-10 pt-4 font-bold text-center text-[28px] p-3 text-black rounded"
                />
                <br />
<div className="flex justify-start">
               <Buttons type="submit">Update</Buttons>
               </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
