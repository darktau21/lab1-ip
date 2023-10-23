import { createBrowserRouter } from "react-router-dom";
import CreateModel from "./pages/CreateModel";
import Layout from "./pages/Layout";
import ModelsList from "./pages/ModelsList";
import Model from "./pages/Model";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <CreateModel /> },
      { path: "/list", element: <ModelsList /> },
      { path: "/model/:id", element: <Model /> },
    ],
  },
]);

export default router;
