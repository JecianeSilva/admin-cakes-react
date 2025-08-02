import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { DashboardHeader } from "./components/DashboardHeader";
import { SummaryCard } from "./components/SummaryCard";
import {
  HourglassTop,
  LocalShipping,
  MonetizationOn,
  ShoppingCart,
} from "@mui/icons-material";
import { UpcomingOrdersCard } from "./components/UpcomingOrdersCard/UpcomingOrdersCard";
import { ProductionListCard } from "./components/ProductionListCard";
import { Typography } from "@mui/material";
import { OrdersTable, OrderStatus } from "./components/OrdersTable";

interface Order {
  id: string;
  clientName: string;
  deliveryTime: string;
  status: OrderStatus;
}

const todayOrdersData: Order[] = [
  {
    id: "#1153",
    clientName: "Mariana Lima",
    deliveryTime: "09:30",
    status: "COMPLETED" as OrderStatus,
  },
  {
    id: "#1148",
    clientName: "Bruno Costa",
    deliveryTime: "11:30",
    status: "PENDING" as OrderStatus,
  },
  {
    id: "#1154",
    clientName: "Ricardo Souza",
    deliveryTime: "12:00",
    status: "CONFIRMED" as OrderStatus,
  },
  {
    id: "#1152",
    clientName: "Ana Silva",
    deliveryTime: "14:00",
    status: "IN_PREPARATION" as OrderStatus,
  },
  {
    id: "#1155",
    clientName: "Fernanda Alves",
    deliveryTime: "15:30",
    status: "CANCELED" as OrderStatus,
  },
  {
    id: "#1156",
    clientName: "Lucas Pereira",
    deliveryTime: "17:00",
    status: "READY" as OrderStatus,
  },
  {
    id: "#1157",
    clientName: "Beatriz Costa",
    deliveryTime: "19:00",
    status: "CONFIRMED" as OrderStatus,
  },
];

const upcomingOrdersData = {
  "Sábado (02/08)": [
    {
      id: "1158-abcd",
      clientName: "Festa Juliana M.",
      status: "Pendente" as const,
    },
  ],
};

const productionListData = [
  { name: "Bolo de Ninho e Nutella", quantity: 4 },
  { name: "Cento de Brigadeiros", quantity: 5 },
];

export function Dashboard() {
  const handleNewOrder = () =>
    console.log("Abrir modal ou ir para a página de novo pedido...");

  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <DashboardHeader onNewOrderClick={handleNewOrder} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4, borderRadius: 1 }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SummaryCard
                title="Pedidos de Hoje"
                value="12"
                icon={<ShoppingCart />}
                link="/pedidos?filter=today"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SummaryCard
                title="Faturamento do Dia"
                value="R$ 1.850"
                icon={<MonetizationOn />}
                link="/"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SummaryCard
                title="Aguardando Preparo"
                value="5"
                icon={<HourglassTop />}
                link="/pedidos?status=pending"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SummaryCard
                title="Entregas da Semana"
                value="28"
                icon={<LocalShipping />}
                link="/"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <OrdersTable orders={todayOrdersData} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Grid container spacing={3} direction="column">
                <Grid>
                  <UpcomingOrdersCard ordersByDate={upcomingOrdersData} />
                </Grid>
                <Grid>
                  <ProductionListCard items={productionListData} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
