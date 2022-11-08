import { useTheme } from "@mui/material/styles";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = () => {
  const theme = useTheme();

  const data = [
    { year: 2019, Users: 2300, Objects: 21356 },
    { year: 2020, Users: 2358, Objects: 22895 },
    { year: 2021, Users: 2101, Objects: 21356 },
    { year: 2022, Users: 2500, Objects: 22368 },
  ];
  return (
    <ResponsiveBar
      data={data}
      keys={["Objects", "Users"]}
      indexBy="year"
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      innerPadding={1}
      groupMode="grouped"
      layout="horizontal"
      enableLabel={false}
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
          ? ["#1976d2", "#9c27b0"]
          : ["#90caf9", "#c393d8"]
      }
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default BarChart;
