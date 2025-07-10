import React from "react";
import Typography from "@mui/material/Typography";
import { ICardProps } from "./Card.types";
import { StyledCard } from "./CardStyled";

const Card = ({
  children,
  title,
  description,
  ...rest
}: ICardProps): React.JSX.Element => {
  return (
    <StyledCard {...rest}>
      <Typography
        component="h2"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      {children}
    </StyledCard>
  );
};

export default Card;
