import { ReactNode } from "react";
import { CardProps } from "@mui/material/Card";

export interface ICardProps extends CardProps {
  children: ReactNode;
  title: string;
  description?: string;
}