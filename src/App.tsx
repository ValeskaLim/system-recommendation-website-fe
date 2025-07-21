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
import MainPage from "./pages/Competition/MainPage";
import ProfileMainPage from "./pages/Profile/ProfileMainPage" ;
import AddCompetitionPage from "./pages/Competition/AddCompetitionPage";
import TeammatesMainPage from "./pages/Teammates/TeammatesMainPage";
import EditCompetitionPage from "./pages/Competition/EditCompetitionPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.REGISTER} element={<RegisterPage />} />

            {/* Home region */}
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

            {/* Competition region */}
            <Route
              path={ROUTE_PATHS.COMPETITION}
              element={
                <ProtectedRoute>
                  <MasterLayout>
                    <MainPage />
                  </MasterLayout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={ROUTE_PATHS.ADD_COMPETITION}
              element={
                <ProtectedRoute requiredRole="admin">
                  <MasterLayout>
                    <AddCompetitionPage />
                  </MasterLayout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={`${ROUTE_PATHS.EDIT_COMPETITION}/:id`}
              element={
                <ProtectedRoute requiredRole="admin">
                  <MasterLayout>
                    <EditCompetitionPage />
                  </MasterLayout>
                </ProtectedRoute>
              }
            ></Route>

            {/* Profile region */}
            <Route
              path={ROUTE_PATHS.PROFILE}
              element={
                <ProtectedRoute>
                  <MasterLayout>
                    <ProfileMainPage />
                  </MasterLayout>
                </ProtectedRoute>
              }
            ></Route>

            {/* Teammates region */}
            <Route
              path={ROUTE_PATHS.TEAMMATES_LIST}
              element={
                <ProtectedRoute>
                  <MasterLayout>
                    <TeammatesMainPage />
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
