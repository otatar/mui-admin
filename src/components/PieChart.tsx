import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material/styles";

const PieChart = () => {
  const theme = useTheme();

  const data = [
    {
      id: "scala",
      label: "scala",
      value: 483,
      color: "#1976d2",
    },
    {
      id: "erlang",
      label: "erlang",
      value: 151,
      color: "hsl(33, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 458,
      color: "hsl(158, 70%, 50%)",
    },
    {
      id: "rust",
      label: "rust",
      value: 465,
      color: "hsl(89, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 567,
      color: "hsl(72, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePie
      data={data}
      theme={
        theme.palette.mode === "dark"
          ? {
              textColor: "#fff",
              tooltip: { container: { background: "#121212", color: "#fff" } },
              annotations: {
                text: { color: "#fff", outlineColor: "#fff" },
              },
            }
          : {}
      }
      colors={
        theme.palette.mode === "light"
          ? ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f", "#0288d1"]
          : ["#90caf9", "#66bb6a", "#ffa726", "#f44336", "#29b6f6"]
      }
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={theme.palette.mode === "light" ? "black" : "#fff"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={theme.palette.mode === "light" ? "black" : "#fff"}
      arcLabelsSkipAngle={10}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          translateX: 40,
          translateY: 30,
          itemsSpacing: 0,
          itemWidth: 60,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
