import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Abouts from "../components/abouts/Abouts";
import Home from "../components/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <Abouts /> },
            { path: "*", element: <Abouts /> },
        ],
    },
]);

export default router;
