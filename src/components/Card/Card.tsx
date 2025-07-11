import React from "react";
import Typography from "@mui/material/Typography";
import { ICardProps } from "./Card.types";
import { StyledCard } from "./CardStyled";

export const Card = ({
  children,
  title,
  description,
  ...rest
}: ICardProps): React.JSX.Element => {
  return (
    <StyledCard {...rest}>
      <Typography
        component="h2"
        fontWeight={500}
        sx={{
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(1.6rem, 4vw, 2rem)",
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          color="text.secondary"
          textAlign="center"
          fontWeight={300}
          mb={2}
        >
          {description}
        </Typography>
      )}
      {children}
    </StyledCard>
  );
};
