import React from "react";
import { IBackgroundVideo } from "./Background.types";

export const BackgroundVideo = ({
  urlVideo,
  type = "video/mp4",
}: IBackgroundVideo): React.JSX.Element => {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: -2 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      >
        <source src={urlVideo} type={type} />
      </video>

      {urlVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};
