import { ReactNode } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { SignIn, DashBoard, Category } from "src/pages";
import { Layout } from "src/components";
// import { Users, Products, Categories, Orders } from "src/pages";

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
  // { path: "/register", element: <Register /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
];

export const privateRoutes = [
  { path: "/", element: <DashBoard /> },
  // { path: "/users", element: <Users /> },
  { path: "/categoria", element: <Category /> },
  // { path: "/products", element: <Products /> },
  // adicione mais conforme necessário
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
