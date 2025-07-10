import React from "react";
import { IContainerProps } from "./Container.types";
import { StyledContainer, StyledContent } from "./ContainerStyled";
import { BackgroundVideo } from "./components/BackgroundVideo";

export const Container = ({
  children,
  direction = "column",
  justifyContent = "center",
  sx,
}: IContainerProps): React.JSX.Element => {
  return (
    <StyledContainer>
      <BackgroundVideo
        urlVideo={"src/assets/background.mp4"}
        type="video/mp4"
      />
      <StyledContent
        direction={direction}
        justifyContent={justifyContent}
        sx={sx}
      >
        {children}
      </StyledContent>
    </StyledContainer>
  );
};
