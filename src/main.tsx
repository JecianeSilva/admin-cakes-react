import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import AppTheme from "./theme/AppTheme";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AppTheme mode={"light"}>
        <App />
      </AppTheme>
    </StyledEngineProvider>
  </React.StrictMode>
);
