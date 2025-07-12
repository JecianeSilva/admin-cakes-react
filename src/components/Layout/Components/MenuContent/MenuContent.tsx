import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { setLocalStorage } from "src/utils";
import { menuListItems } from "src/constants/MenuList.const";

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleListItemClick = (path: string) => {
    if (path === "/logout") {
      localStorage.clear();
      navigate("/login");
      return;
    }
    navigate(path);
  };

  const handleClose = () => {
    setLocalStorage("access_token", "");
    setLocalStorage("refresh_token", "");
    navigate("/login");
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {menuListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isSelected(item.path)}
              onClick={() => handleListItemClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        <ListItem key={"logout"} disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={() => handleClose()}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
