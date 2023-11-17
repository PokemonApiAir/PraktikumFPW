import { createBrowserRouter } from "react-router-dom";

// Pages
import Dashboard from './pages/dashboard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    }
]);

export default router;