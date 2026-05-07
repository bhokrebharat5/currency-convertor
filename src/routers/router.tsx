
import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Abouts from "../components/abouts/Abouts";
import Home from "../components/home/Home";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <Abouts />,
      }
    ]
  }

]);

export default router;