import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App as AntApp } from "antd";
import { Provider as JotaiProvider } from "jotai";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import KanbanBoard from "./pages/KanbanBoard";
import ProjectDetails from "./pages/projects/ProjectDetails";

// Layout
import AppLayout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 6,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      headerBg: "#ffffff",
      siderBg: "#ffffff",
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: "#e6f7ff",
      itemSelectedColor: "#1890ff",
    },
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider>
          <ConfigProvider theme={antdTheme}>
            <AntApp>
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <AppLayout>
                          <Dashboard />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/kanban"
                    element={
                      <ProtectedRoute>
                        <AppLayout>
                          <KanbanBoard />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/project/:id"
                    element={
                      <ProtectedRoute>
                        <AppLayout>
                          <ProjectDetails />
                        </AppLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect root to dashboard */}
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />

                  {/* Catch all - redirect to login */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </BrowserRouter>
            </AntApp>
          </ConfigProvider>
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
