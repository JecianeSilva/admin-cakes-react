// /src/components/common/EmptyState.tsx

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        minHeight: "400px",
      }}
    >
      <Box sx={{ color: "grey.400", mb: 2 }}>{icon}</Box>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: "400px" }}>
        {description}
      </Typography>
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
}
