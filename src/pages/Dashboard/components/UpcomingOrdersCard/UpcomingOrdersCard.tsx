import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { IUpcomingOrdersProps } from "./UpcomingOrdersCard.types";
import React from "react";
import { ArrowForward } from "@mui/icons-material";
import { Tag } from "../../../../components";
import { TagColor } from "../../../../components/Tag/Tag.types";

const statusColorMap: Record<string, TagColor> = {
  Pendente: "yellow",
  "Em Preparo": "blue",
  "Pronto p/ Entrega": "green",
};
export function UpcomingOrdersCard({ ordersByDate }: IUpcomingOrdersProps) {
  return (
    <Card elevation={3} sx={{ height: "100%" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
          🚀 Próximos Pedidos
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {Object.entries(ordersByDate).map(([date, orders], index) => (
            <React.Fragment key={date}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {date}
              </Typography>
              <List dense>
                {orders.map((order) => (
                  <ListItem
                    key={order.id}
                    disableGutters
                    secondaryAction={
                      <Tag
                        text={order.status}
                        color={statusColorMap[order.status]} // Usamos o mapa para obter a cor
                      />
                    }
                  >
                    <ListItemText
                      primary={`#${order.id.slice(0, 4)} - ${order.clientName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </Box>
        <Button
          size="small"
          endIcon={<ArrowForward />}
          href="/pedidos"
          sx={{ mt: 2, alignSelf: "flex-start" }}
        >
          Ver todos
        </Button>
      </CardContent>
    </Card>
  );
}
