import {
  CardOne,
  CardTwo,
  CardThree,
  CardFour,
  CardFive,
} from "../component/Cards/cards";
import ChartOne from "../component/Charts/chartOne";
import ChartTwo from "../component/Charts/chartTwo";
import ChartThree from "../component/Charts/chartThree";
import ChatCard from "../component/Cards/chatCard";

const DashboardHome = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 flex-1 z-10">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
        <CardFive />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 z-10">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <ChatCard />
      </div>
    </>
  );
};
export default DashboardHome;
