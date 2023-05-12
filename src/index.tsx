import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import NotFound from "./pages/NotFound";
import Collection from "./pages//Collection";
import Brand from "./pages/Brand";
import Brands from "./pages/Brands";
import BrandForm from "./pages/BrandForm";
import Account from "./pages/Account";
import CollectionForm from "./pages/CollectionForm";
import Cart from "./pages/Cart/Cart";
import Scrap from "./pages/Scrap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/brand",
        element: <Brands />,
      },
      {
        path: "/brand/:id",
        element: <Brand />,
      },
      {
        path: "/brandform",
        element: <BrandForm />,
      },
      {
        path: "/brandform/:id",
        element: <BrandForm />,
      },
      {
        path: "/collection/:cid",
        element: <Collection />,
      },
      {
        path: "/brandform/:id/collectionform",
        element: <CollectionForm />,
      },
      {
        path: "/brandform/:id/collectionform/:cid",
        element: <CollectionForm />,
      },
      {
        path: "/scrap",
        element: <Scrap />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

reportWebVitals();
