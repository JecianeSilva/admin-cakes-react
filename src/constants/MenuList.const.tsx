import DashboardIcon from "@mui/icons-material/DashboardRounded";
import CategoryIcon from "@mui/icons-material/CategoryRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingIcon from "@mui/icons-material/LocalShippingRounded";
import GroupIcon from "@mui/icons-material/GroupRounded";

export const menuListItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Categorias", icon: <CategoryIcon />, path: "/categorias" },
  { text: "Produtos", icon: <Inventory2RoundedIcon />, path: "/produtos" },
  { text: "Pedidos", icon: <LocalShippingIcon />, path: "/pedidos" },
  { text: "Clientes", icon: <GroupIcon />, path: "/clientes" },
];
