/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApexOptions } from 'apexcharts';
import { Role } from '@/routes/PrivateRoute';
import { fetchChartRestaurant, fetchRestaurantChart } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

import ReactApexChart from 'react-apexcharts';

const currentDate = new Date(); // Get the current date
const categories = [];

for (let i = 0; i < 12; i++) {
  const month = currentDate.getMonth();

  // Format the month as needed, e.g., "Sep"
  const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentDate.getFullYear(), month, 1));

  categories.unshift(formattedMonth); // Add to the beginning of the array

  // Move to the previous month
  currentDate.setMonth(month - 1);
}


const getFormat = () => {

  const currentDate = new Date(); // Get the current date

  // Loop to generate the last 10 months' categories with date ranges
  for (let i = 0; i < 10; i++) {
    const month = currentDate.getMonth(); // Get the current month (0-based index)

    // Format the start and end dates for the month
    const startOfMonth = new Date(currentDate.getFullYear(), month, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), month + 1, 0);

    // Format the start and end dates in the "dd.MM.yyyy" format
    const formattedDateRange = `${startOfMonth.getDate()}/${startOfMonth.getMonth() + 1}/${startOfMonth.getFullYear()} - ${endOfMonth.getDate()}/${endOfMonth.getMonth() + 1}/${endOfMonth.getFullYear()}`;

    return formattedDateRange;
  }

}


const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#e01f2d', '#f24653'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#e01f2d', '#f24653'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: 1,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: categories,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};


const ChartOne = () => {

  const token = useAppSelector((state: RootState) => state.signin.token);
  const dispatch = useAppDispatch();
  const role: Role = useAppSelector((state: RootState) => state.signin.role);

  useEffect(() => {
    dispatch(fetchRestaurantChart(token));
  }, [dispatch, token])

  useEffect(() => {
    dispatch(fetchChartRestaurant(token));
  }, [dispatch, token])



  const restaurantChartData: any = useAppSelector((state: RootState) => state.restaurant.chartData);
  const { restaurantChart } = useAppSelector((state: RootState) => state.restaurant);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default   sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#f24653]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#f24653]"> Orders </p>
              <p className="text-sm font-medium"> {getFormat()} </p>
            </div>
          </div>

        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 ">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card   ">
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={role === "restaurant" ? [{name: 'orders',
            data: restaurantChart}] : role === "admin" && restaurantChartData.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};


export default ChartOne;
