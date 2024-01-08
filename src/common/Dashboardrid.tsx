import { IoBagHandle } from "react-icons/io5";
import { ReactNode } from "react";
export function DashboarDesign() {
  return (
    <>
      <div className="flex gap- w-full">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-black" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Cost</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                123333
              </strong>
              <span className="text-sm text-green-500 pl-2">123</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-black" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Cost</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                123333
              </strong>
              <span className="text-sm text-green-500 pl-2">123</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-black" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Cost</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                123333
              </strong>
              <span className="text-sm text-green-500 pl-2">123</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-black" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Cost</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                123333
              </strong>
              <span className="text-sm text-green-500 pl-2">123</span>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </>
  );
}

function BoxWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

export default BoxWrapper;
