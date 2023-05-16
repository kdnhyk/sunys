import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import NotFound from "./pages/NotFound";
import Collection from "./pages//Collection";
import Brand from "./pages/Brand";
import BrandForm from "./pages/BrandForm";
import Account from "./pages/Account";
import CollectionForm from "./pages/CollectionForm";
import Cart from "./pages/Cart";
import Search from "./pages/BrandList";
import News from "./pages/News";
import Magazine from "./pages/Magazine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <News />,
      },
      {
        path: "/magazine",
        element: <Magazine />,
      },
      {
        path: "/brand",
        element: <Search />,
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
