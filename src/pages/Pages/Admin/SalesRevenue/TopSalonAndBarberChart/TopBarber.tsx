import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";
import { fetchTopBarber } from "Services/Sales"; // Import API method
import { toast, ToastContainer } from "react-toastify";

const TopBarber = ({ dataColors }: any) => {
  const [barberData, setBarberData] = useState<{ names: string[]; counts: number[] }>({
    names: [],
    counts: [],
  });

  useEffect(() => {
    const getTopBarbers = async () => {
      try {
        const topBarbers = await fetchTopBarber(); // Call the imported function
        if (topBarbers.length > 0) {
          const names = topBarbers.map((barber: any) => barber.barberName);
          const counts = topBarbers.map((barber: any) => barber.appointmentsCount);
          setBarberData({ names, counts });
        } else {
          toast.error("No top barbers found");
        }
      } catch (error) {
        toast.error("Error fetching top barbers");
      }
    };

    getTopBarbers();
  }, []);

  const chartColumnDistributedColors = getChartColorsArray(dataColors);

  const series = [{ data: barberData.counts }];

  const options: any = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart: any, w: any, e: any) {},
      },
    },
    colors: chartColumnDistributedColors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: barberData.names,
      labels: {
        style: {
          colors: ["#038edc", "#51d28c", "#f7cc53", "#f34e4e", "#564ab1", "#5fd0f3"],
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <>
      <ToastContainer />
      <ReactApexChart dir="ltr" className="apex-charts" series={series} options={options} type="bar" height={350} />
    </>
  );
};

export { TopBarber };
