import { Box } from "@mantine/core";
import { useLocation } from "react-router";

function Dashboard() {
  const location = useLocation();
  return (
    <>
      <Box>Dashboard </Box>
      <Box>{location.pathname}</Box>
    </>
  );
}
export default Dashboard;
