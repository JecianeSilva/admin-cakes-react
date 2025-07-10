import { ReactNode } from "react";

export  interface IContainerProps {
  children: ReactNode;
  direction?: "row" | "column";
  justifyContent?: string;
  sx?: object;
}
