// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "./Components/SiderBar/SiderBar";
import MenuContent from "./Components/MenuContent/MenuContent";

export const Layout = () => {
  return (
    <Box display="flex" height="100vh">
      <SideBar
        user={{
          name: "Maria Oliveira",
          email: "maria@teste.com",
          imageUrl: "/images/maria-avatar.png",
        }}
      >
        <MenuContent />
      </SideBar>
      <Box flexGrow={1}>
        {/* <Topbar /> */}
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
