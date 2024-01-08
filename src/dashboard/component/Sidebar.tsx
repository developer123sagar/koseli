/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { CustomIcon } from "@/common";
import { Link, useLocation } from "react-router-dom";
import { Sidebar_data } from "@/data";
import { AnimatePresence, motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { RootState, useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { BusinessType } from "@/types";

export const Sidebar: React.FC = () => {
  const pathname = useLocation().pathname;
  const [filteredSidebarData, setFilteredSidebarData] = useState<any>([]);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const totalNewOrders = useSelector((state: RootState) => state.order);

  const { role } = useAppSelector((state: RootState) => state.signin);
  const bussinessType: BusinessType =
    (localStorage.getItem("bussinnessType") as BusinessType) || "";

  useEffect(() => {
    const filteredData = Sidebar_data.map((item) => {
      const filteredSubmenu = item.submenu?.filter((submenuItem) =>
        submenuItem.role?.some((r) => role.includes(r))
      );
      return {
        ...item,
        submenu: filteredSubmenu,
      };
    }).filter((item) => item.role?.some((r) => role.includes(r)));

    setFilteredSidebarData(filteredData);
  }, [role]);

  const toggleSubMenu = (index: number) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderMenuItem = (item: any, index: number) => {
    const isSubmenuOpen = openSubmenuIndex === index;

    if (item.name === "Video" && bussinessType === "restaurant") {
      return null; 
    }

    return (
      <div
        key={index}
        className="leading-10 mt-4 hidden md:block sm:block h-auto"
      >
        {item.path ? (
          <Link to={item.path}>
            <div
              className={`group flex gap-3 pl-2 items-center hover:bg-gray-200 relative  transition duration-500 py-2  ${
                item.path === pathname && "bg-gray-200"
              }`}
            >
              <CustomIcon
                icon={item.icon}
                size={16}
                className={`text-black text-sm group-hover:text-[#e01f2d] font-semibold ${
                  item.path === pathname ? "text-[#e01f2d]" : ""
                }`}
              />
              <h1
                className={`text-black  group-hover:text-[#e01f2d] transition duration-500 text-sm font-semibold ${
                  item.path === pathname && "text-[#e01f2d]"
                }`}
              >
                {item.name}
              </h1>
            </div>
          </Link>
        ) : (
          <div
            onClick={() => toggleSubMenu(index)}
            style={{ cursor: "pointer" }}
          >
            <div className="group flex gap-3 pl-2 items-center w-full  hover:bg-gray-200 transition duration-500 py-2">
              <CustomIcon
                icon={item.icon}
                size={16}
                className={`text-black text-sm group-hover:text-[#e01f2d] font-semibold ${
                  item.path === pathname ? "text-[#e01f2d]" : ""
                }`}
              />
              <h1
                className={`text-black  group-hover:text-[#e01f2d] transition duration-500 text-sm  font-semibold ${
                  item.path === pathname && "text-[#e01f2d]"
                }`}
              >
                {item.name}
              </h1>

              {role == "admin" ? null : (
                <div>
                  {item.meter && (
                    <div
                      className={`h-[25px] w-[30px] rounded-full flex  justify-center items-center text-white bg-[#e01f2d] ${
                        totalNewOrders.totalOrders === 0 && "hidden"
                      }`}
                    >
                      <h1 className="text-[15px] ">
                        {" "}
                        {totalNewOrders.totalOrders}{" "}
                      </h1>
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginLeft: "auto" }}>
                {item.submenu && (
                  <>
                    {isSubmenuOpen ? (
                      <CustomIcon
                        icon={BsChevronUp}
                        color="gray"
                        size={14}
                        className="mr-2"
                      />
                    ) : (
                      <CustomIcon
                        icon={BsChevronDown}
                        color="gray"
                        size={14}
                        className="mr-2"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {item.submenu && isSubmenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: "just", stiffness: "100" }}
              layout
            >
              <ul className="list-none overflow-hidden">
                {item.submenu.map(
                  (submenuItem: any, id: number) =>
                    (!submenuItem.role ||
                      submenuItem.role.some((r: any) => role.includes(r))) && (
                      <Link
                        to={submenuItem.path!}
                        key={`${submenuItem.name}-${id}`}
                      >
                        <motion.li
                          initial={{ opacity: 0, y: -120 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -120 }}
                          transition={{ duration: 0.3, delay: id * -0.05 }}
                          className={`text-black  text-sm font-medium hover:text-[#e01f2d]  cursor-pointer flex gap-2 transition duration-500 py-2 px-2 ${
                            submenuItem.path === pathname &&
                            "text-[#e01f2d] bg-gray-200"
                          }`}
                        >
                          <CustomIcon
                            icon={submenuItem.icon}
                            size={16}
                            className={`text-black mr-1 text-sm font-semibold ${
                              submenuItem.path === pathname
                                ? "text-[#e01f2d]"
                                : ""
                            }`}
                          />
                          {submenuItem.name}
                        </motion.li>
                      </Link>
                    )
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <aside className="fixed left-0 bg-white top-0 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 border-r border-gray-200 pt-2">
      <div className="mt-16 z-50 scrollbar-hide overflow-y-auto">
        {filteredSidebarData.map((item: any, index: number) =>
          renderMenuItem(item, index)
        )}
      </div>
    </aside>
  );
};
