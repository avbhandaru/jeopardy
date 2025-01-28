// src/app/lib/theme.ts

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

export default theme;

export const testTheme = createTheme({
  palette: {
    primary: { main: "#59CAB3" },
    secondary: { main: "#EC8B62" },
    background: {
      default: "#F3EDDD",
      paper: "#F3EDDD",
    },
    success: { main: "#DCF8C6" },
    error: { main: "#EE9CAD" },
    info: { main: "#CBD69D" },
    warning: { main: "#F6AB49" },
  },
});
