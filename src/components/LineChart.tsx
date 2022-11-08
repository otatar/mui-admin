import { useTheme } from "@mui/material/styles";
import { ResponsiveLine } from "@nivo/line";

const LineChart = () => {
  const theme = useTheme();

  const data = [
    {
      id: "Total",
      color: "#1976d2",
      data: [
        { x: "January", y: "105693" },
        { x: "February", y: "198692" },
        { x: "March", y: "251458" },
        { x: "April", y: "98567" },
        { x: "May", y: "99851" },
        { x: "June", y: "104569" },
        { x: "Jully", y: "101458" },
        { x: "August", y: "120369" },
        { x: "September", y: "86457" },
        { x: "October", y: "98561" },
        { x: "November", y: "100236" },
        { x: "December", y: "99637" },
      ],
    },
    {
      id: "Successfull",
      color: "#2e7d32",
      data: [
        { x: "January", y: "104582" },
        { x: "February", y: "195698" },
        { x: "March", y: "200256" },
        { x: "April", y: "97589" },
        { x: "May", y: "99452" },
        { x: "June", y: "100569" },
        { x: "Jully", y: "99568" },
        { x: "August", y: "125698" },
        { x: "September", y: "84589" },
        { x: "October", y: "95698" },
        { x: "November", y: "99963" },
        { x: "December", y: "93668" },
      ],
    },
    {
      id: "Warning",
      color: "#ed6c02",
      data: [
        { x: "January", y: "3568" },
        { x: "February", y: "5896" },
        { x: "March", y: "13258" },
        { x: "April", y: "2056" },
        { x: "May", y: "3222" },
        { x: "June", y: "8945" },
        { x: "Jully", y: "3568" },
        { x: "August", y: "10256" },
        { x: "September", y: "5444" },
        { x: "October", y: "1089" },
        { x: "November", y: "13236" },
        { x: "December", y: "4566" },
      ],
    },
    {
      id: "Failed",
      color: "#d32f2f",
      data: [
        { x: "January", y: "502" },
        { x: "February", y: "305" },
        { x: "April", y: "222" },
        { x: "May", y: "168" },
        { x: "June", y: "389" },
        { x: "Jully", y: "256" },
        { x: "August", y: "583" },
        { x: "September", y: "444" },
        { x: "October", y: "985" },
        { x: "November", y: "123" },
        { x: "December", y: "201" },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      theme={
        theme.palette.mode === "dark"
          ? {
              textColor: "#fff",
              tooltip: { container: { background: "#121212", color: "#fff" } },
            }
          : {}
      }
      colors={
        theme.palette.mode === "light"
          ? ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f"]
          : ["#90caf9", "#66bb6a", "#ffa726", "#f44336"]
      }
      margin={{ top: 10, right: 110, bottom: 40, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      axisLeft={{
        legend: "# of transactions",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      pointSize={6}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
    />
  );
};

export default LineChart;
