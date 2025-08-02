import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { IProductionListProps } from "./ProductionListCard.types";

export function ProductionListCard({ items }: IProductionListProps) {
  return (
    <Card elevation={3} sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
          🔥 Itens para Produção
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.name}
              disableGutters
              secondaryAction={<Chip label={`${item.quantity} un`} />}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
