import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Menu = ({
  children,
  isMenuOpen,
  closeMenu,
  y,
}: {
  children: React.ReactNode;
  isMenuOpen: boolean;
  closeMenu: () => void;
  y: number;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        menuRef.current &&
        target &&
        !menuRef.current.contains(target) &&
        !target.classList.contains("h-10")
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: y,
            }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            className="absolute right-0 mt-3 mx-5  bg-[#fbfafaf6]"
            style={{
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.22))",
              transformOrigin: "right bottom",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
