// src/app/lib/Providers.tsx
"use client"; // This ensures the component is treated as a Client component

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
<<<<<<< HEAD
import theme from './theme';
=======
import theme from "./theme";
>>>>>>> matt/graphql
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
<<<<<<< HEAD
    return (
        <ApolloProvider client={client}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme} defaultMode="system">
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </ApolloProvider>
    );
=======
  return (
    <ApolloProvider client={client}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme} defaultMode="system">
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ApolloProvider>
  );
>>>>>>> matt/graphql
};

export default Providers;
