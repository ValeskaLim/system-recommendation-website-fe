import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { ROUTE_PATHS } from "./router/routePaths";
import HomePage from "./pages/Layout/HomePage";
import { AuthProvider } from "./hooks/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/Layout/NotFoundPage";
import MasterLayout from "./components/MasterLayout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />

            <Route
              path={ROUTE_PATHS.HOME}
              element={
                <ProtectedRoute>
                  <MasterLayout>
                    <HomePage />
                  </MasterLayout>
                </ProtectedRoute>
              }
            ></Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
