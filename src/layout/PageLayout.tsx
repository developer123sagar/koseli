import React from "react";
import HeaderNoLocation from "@/pages/HeaderNoLocation";
import { useEffect } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderNoLocation />
      <div className="overflow-hidden">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
          return child;
        })}
      </div>
    </>
  );
}
