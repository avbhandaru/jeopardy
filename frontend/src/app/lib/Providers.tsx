// src/app/lib/Providers.tsx
"use client"; // This ensures the component is treated as a Client component

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { testTheme } from "./theme";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <ApolloProvider client={client}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={testTheme} defaultMode="system">
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ApolloProvider>
  );
};

export default Providers;
