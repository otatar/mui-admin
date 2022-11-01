import { useState, useMemo, createContext, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DialogProvider from "./contexts/MuiDialogContext";

import Box from "@mui/material/Box";
import AuthenticatedRoute from "./AuthenticatedRoute";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ErrorBoundary from "./pages/ErrorBoundary";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  //Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthenticatedRoute>
          <MainLayout />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          dense
          autoHideDuration={2500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <DialogProvider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                color: "text.primary",
                borderRadius: 1,
                p: 3,
              }}
            >
              <RouterProvider router={router} />
            </Box>
          </DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default App;
