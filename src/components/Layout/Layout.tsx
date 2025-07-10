// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "./Components/SiderBar/SiderBar";

export const Layout = () => {
  return (
    <Box display="flex" height="100vh">
      <SideBar />
      <Box flexGrow={1}>
        {/* <Topbar /> */}
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
