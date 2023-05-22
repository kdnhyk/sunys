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
import BrandList from "./pages/BrandList";
import News from "./pages/News";
import Magazine from "./pages/Magazine";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
        element: <BrandList />,
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
        errorElement: <News />,
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
}); // 생성

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);

reportWebVitals();
