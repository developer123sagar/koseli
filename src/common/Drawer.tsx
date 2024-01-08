import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface IDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  position: "right" | "left";
  xValue: number;
  width:string;
  
  
  
}

const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  position,
  xValue,
  width,
}: IDrawerProps) => {
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="bg-slate-200/20 backdrop-blur p-8 fixed  inset-0 z-[9999] grid place-items-center overflow-y-scroll scrollbar-hide cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, x: xValue }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: xValue }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-[#fefefefe] text-gray-900 w-[400px] shadow-xl cursor-default  relative overflow-y-scroll scrollbar-hide"
            style={{
              position: "absolute",
              [position]: 0,
              height: "100%",
              width:width,
              
            }}
          >
            <div className="relative z-10">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
