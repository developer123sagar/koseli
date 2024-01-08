import { Headers } from "../dashboard/component/Header/Headers";
import { Sidebar } from "../dashboard/component/Sidebar";

const DefaultLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden fixed top-0 left-0">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden z-999999">
        <Headers />
      </div>
    </div>
  );
};

export default DefaultLayout;
