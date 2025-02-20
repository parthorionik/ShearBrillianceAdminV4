import React from 'react';
import ReactApexChart from "react-apexcharts";

const PrjectsStatusCharts = ({ chartId, series }: any) => {

    // Directly use hex colors for Success, Warning, and Danger
    const chartColors = ["#0AB39C", "#F7B84B", "#F06548"]; // Success, Warning, Danger

    var options: any = {
        labels: ["Completed", "Cancelled"],
        chart: {
            type: "donut",
            height: 230,
        },
        plotOptions: {
            pie: {
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "90%",
                    labels: {
                        show: false,
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            lineCap: "round",
            width: 0
        },
        colors: chartColors, // Set the colors for the chart directly with hex values
    };

    return (
        <React.Fragment>
            <ReactApexChart 
                dir="ltr"
                options={options}
                series={series}
                id={chartId}
                type="donut"
                height="230"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export { PrjectsStatusCharts };
