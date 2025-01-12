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
