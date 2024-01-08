import { Setting_Form } from "@/constants";
import Dashboard_Layout from "@/layout/Design_Dashoard";
const { form } = Setting_Form;

export default function Setting() {
  return (
    <>
      <Dashboard_Layout button={false} buttonText="Add Advertisement">
        <main>
          <div>
            <div>
              {/* seeting page start */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold text-black ">
                  Setting Pages
                </h2>
                <nav>
                  <ol className="flex items-center gap-2">
                    <li>
                      <a className="font-medium" href="index.html">
                        Dashboard /
                      </a>
                    </li>
                    <li className="font-medium text-[#3C50E0]">Settings</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {/* setting section */}
          <div className="flex gap-8">
            <div className="  admin-header basis-[60%]">
              <div className="rounded-sm border border-stroke  bg-white shadow-default ">
                <div className="border-b border-stroke py-4 px-7 ">
                  <h3 className=" text-black  font-bold">
                    Personal Information
                  </h3>
                </div>
              </div>
              <div className="p-7 ">
                <form action="#">
                  <div className="">
                    <div className="">
                      <div className="grid grid-cols-2 gap-5 ">
                        {form.map((item, id) => (
                          <div key={`${item.placeholder}..${id}`}>
                            <input
                              required
                              placeholder={item.placeholder}
                              type={item.type}
                              className="form-control  w-full bg-[#2965a1] bg-opacity-10 text-black font-semibold t py-3 pl-10 focus:bg-none focus-visible:outline-none rounded placeholder:text-gray-600 border border-gray-200"
                            />
                          </div>
                        ))}
                      </div>
                      <input
                        type="textarea"
                        placeholder="Enter the Bio"
                        className="w-[97%] h-40 form-control  bg-[#2965a1] bg-opacity-10 mt-10 font-semibold pl-10 focus:outline-none rounded placeholder:text-gray-600 border-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-10">
                    <button
                      className="flex justify-center bg-blue-800 rounded border py-2 px-6 font-medium text-white hover:shadow-1  "
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center admin-header  rounded  py-2 px-6  text-black  font-bold hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* photo section */}
            <div className="basis-[30%] admin-header">
              <div className="border-b border-stroke py-4 px-7 ">
                <h3 className="font-bold text-black">Your Photo</h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img
                        loading="lazy"
                        src="./images/user/user-03.png"
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 font-bold text-black  ">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="font-medium text-sm hover:text-gray-500">
                          Delete
                        </button>
                        <button className="font-medium text-sm hover:text-[#3C50E0]">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative  mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-blue-400 bg-gray py-4 px-4  sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute  inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col  items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white  ">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p className="font-medium text-sm">
                        <span className="text-[#3C50E0]">Click to upload</span>
                        or drag and drop
                      </p>
                      <p className="mt-1.5 font-medium text-sm">
                        SVG, PNG, JPG or GIF
                      </p>
                      <p className="font-medium text-sm">(max, 800 X 800px)</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-10">
                    <button
                      className="flex justify-center bg-blue-800 rounded border py-2 px-6 font-medium text-white hover:shadow-1  "
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center admin-header  rounded  py-2 px-6  text-black  font-bold hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Dashboard_Layout>
    </>
  );
}
