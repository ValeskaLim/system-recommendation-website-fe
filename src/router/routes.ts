import { lazy } from "react";
import { ROUTE_PATHS } from "./routePaths";

// const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const HomePage = lazy(() => import('../pages/Layout/HomePage'));

export const routes = [
    {
        path: ROUTE_PATHS.LOGIN,
        element: LoginPage,
        title: 'Login',
        isPublic: true
    },
    {
        path: ROUTE_PATHS.REGISTER,
        element: RegisterPage,
        title: 'Register',
        isPublic: true
    },
    {
        path: ROUTE_PATHS.HOME,
        element: HomePage,
        title: 'Home',
        isPublic: true
    }
]