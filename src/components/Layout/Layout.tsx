// src/layouts/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "./Components/SiderBar/SiderBar";
import MenuContent from "./Components/MenuContent/MenuContent";
import { AnimatePresence } from "framer-motion";
import { AnimatedPage } from "./Components/AnimatedPage/AnimatedPage";

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
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            {/* <Topbar /> */}
            <Box p={2}>
              <Outlet />
            </Box>
          </AnimatedPage>
        </AnimatePresence>
      </Box>
    </Box>
  );
};
