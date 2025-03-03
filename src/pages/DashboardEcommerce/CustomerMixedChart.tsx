import React from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import getChartColorsArray from "../../common/data/ChartsDynamicColor";

const CustomerMixedChart = ({ dataColors }: any) => {
  var chartMultiColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "New Customer",
      type: "column",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 5.0, 5.5, 6.0, 6.5],
    },
    {
      name: "Repeated Customer",
      type: "column",
      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.0, 9.5, 10.0, 10.5],
    },
    {
      name: "Total Customer",
      type: "line",
      data: [20, 29, 37, 36, 44, 45, 50, 58, 60, 65, 70, 75],
    },
  ];

  var options: any = {
    chart: {
      stacked: !1,
      toolbar: {
        show: !1,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      width: [1, 1, 4],
    },
    // title: {
    //   text: "Customer Engagement Analysis",
    //   align: "left",
    //   offsetX: 110,
    //   style: {
    //     fontWeight: 600,
    //   },
    // },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: [
      {
        axisTicks: {
          show: !0,
        },
        axisBorder: {
          show: !0,
          color: "#038edc",
        },
        labels: {
          style: {
            colors: "#038edc",
          },
        },
        title: {
          text: "Customer",
          style: {
            color: "#038edc",
            fontWeight: 600,
          },
        },
        tooltip: {
          enabled: !0,
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: !0,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
    colors: chartMultiColors,
  };

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <h4 className="card-title mb-0">Customer Engagement Analysis </h4>
          </CardHeader>
          <CardBody>
            <ReactApexChart
              dir="ltr"
              className="apex-charts"
              options={options}
              series={series}
              type="line"
              height={350}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export { CustomerMixedChart };
