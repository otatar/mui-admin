import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import HomeCard from "../components/HomeCard";
import AgentList from "../components/AgentList";

import useDocumentTitle from "../hooks/useDocumentTitle";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import TimeLine from "../components/TimeLine";

export default function Home() {
  const CaradData = [
    { label: "Total Users", value: 2500 },
    { label: "Total Objects", value: 22368 },
    { label: "Total Transactions", value: 956124 },
    { label: "Successfull Transactions", value: 865127, type: "success" },
    { label: "Warning Transactions", value: 50569, type: "warning" },
    { label: "Failed Transactions", value: 4236, type: "error" },
  ];
  useDocumentTitle("Home");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {CaradData.map((item, index) => (
          <Grid xs={6} md={4} lg={2} key={index}>
            <HomeCard label={item.label} value={item.value} type={item.type} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} lg={8}>
          <Card>
            <CardHeader title="Transactions" />
            <CardContent sx={{ height: "300px" }}>
              <LineChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} lg={4}>
          <Card>
            <CardHeader title="Users vs Objects" />
            <CardContent sx={{ height: "300px" }}>
              <BarChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} lg={6}>
          <Card>
            <CardHeader title="Timeline" />
            <CardContent>
              <TimeLine />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} lg={3}>
          <Card>
            <CardHeader title="Languages" />
            <CardContent sx={{ height: "400px" }}>
              <PieChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} lg={3}>
          <Card>
            <CardHeader title="Agent List" />
            <CardContent sx={{ height: "400px" }}>
              <AgentList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
