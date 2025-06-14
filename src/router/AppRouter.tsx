import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes";

function AppRouter () {
    return (
        <Router>
            <Routes>
                {routes.map((route) => {
                    const { path, element: Component, isPublic, roles, hideAuthenticated } = route;

                    return (
                        <Route>
                            key={path}
                            path={path},
                            element={
                            
                            }
                        </Route>
                    )
                })}
            </Routes>
        </Router>
    )
}

export default AppRouter;