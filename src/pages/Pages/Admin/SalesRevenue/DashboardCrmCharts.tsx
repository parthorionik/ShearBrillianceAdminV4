import React from 'react';
import ReactApexChart from "react-apexcharts";
import useChartColors from 'Components/Common/useChartColors';

const BalanceOverviewCharts = ({ chartId, series }: any) => {
    const chartColors = useChartColors(chartId);

    // Custom colors for Revenue and Appointments
    const revenueColor = "#50ad65"; // Green color for Revenue
    const appointmentsColor = "#57b7c2"; // Red color for Appointments

    // Override chartColors with specific colors for Revenue and Appointments
    var options: any = {
        chart: {
            height: 290,
            type: 'area',
            toolbar: 'false',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return  value  ;
                }
            },
            tickAmount: 5,
            min: 0,
            max: 260
        },
        // Specify different colors for the two series (Revenue and Appointments)
        colors: [revenueColor, appointmentsColor],  // Use custom colors here
        fill: {
            opacity: 0.06,
            colors: [revenueColor, appointmentsColor], // Apply the same colors to fill
            type: 'solid'
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                id={chartId}
                type="area"
                height="290"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export { BalanceOverviewCharts };
