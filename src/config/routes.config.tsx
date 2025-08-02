import { ReactNode } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  SignIn,
  Category,
  Register,
  Product,
  Dashboard,
  Client,
  Order,
} from "src/pages";
import { Layout } from "src/components";
import { CreateCategoryForm } from "../pages/Category/CategoryCreation";
import { EditionCategoryForm } from "../pages/Category/CategoryEdition";
import { CreateProductForm } from "../pages/Product/ProductCreation";
import { EditionProductForm } from "../pages/Product/ProductEdition";

interface PrivateRouteProps {
  children: ReactNode;
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("access_token");
  // return children;
  return token ? children : <Navigate to="/login" />;
};

export const publicRoutes = [
  { path: "/login", element: <SignIn /> },
  { path: "/cadastro-usuario", element: <Register /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
];

export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/categorias", element: <Category /> },
  { path: "/categorias/cadastrar", element: <CreateCategoryForm /> },
  { path: "/categorias/editar/:id", element: <EditionCategoryForm /> },

  { path: "/produtos", element: <Product /> },
  { path: "/produtos/cadastrar", element: <CreateProductForm /> },
  { path: "/produtos/editar/:id", element: <EditionProductForm /> },

  { path: "/clientes", element: <Client /> },
  { path: "/pedidos", element: <Order /> },
];

export const routes = createBrowserRouter([
  ...publicRoutes.map((route) => ({
    path: route.path,
    element: route.element,
  })),
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: privateRoutes,
  },
]);
