import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import SelectContent from "./SelectContent";
// import CardAlert from "./CardAlert";
import MenuContent from "../MenuContent/MenuContent";
import MenuList from "../MenuList/MenuList";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideBar() {
  return (
    <Drawer variant="permanent" sx={{ display: { xs: "none", md: "block" } }}>
      {/* <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box> */}

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="John Doe"
          src="/static/images/avatar/7.jpg"
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "text.primary",
          }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            John Doe
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            doe@example.com
          </Typography>
        </Box>
        <MenuList />
      </Stack>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
        {/* <CardAlert /> */}
      </Box>
    </Drawer>
  );
}
