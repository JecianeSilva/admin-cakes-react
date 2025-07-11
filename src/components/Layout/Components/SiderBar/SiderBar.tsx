import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import SelectContent from "./SelectContent";
// import CardAlert from "./CardAlert";
import MenuContent from "../MenuContent/MenuContent";
import MenuList from "../MenuList/MenuList";
import { Drawer } from "./SideBarStyled";
import { ISideBarProps } from "./SiderBar.types";

export default function SideBar({ user, children }: ISideBarProps) {
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
          alt={user.name}
          src={user.imageUrl}
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
            {user.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {user.email}
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
        {children}
      </Box>
    </Drawer>
  );
}
