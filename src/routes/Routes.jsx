import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import MainLayout from "../layouts/MainLayout";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router-dom";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import SellerRequests from "../pages/Dashboard/Admin/SellerRequests";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";
import AllProduct from "../pages/AllProduct/AllProduct";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts";
import AdminManageOrders from "../pages/Dashboard/Admin/AdminManageOrders";
import SellerManageProducts from "../pages/Dashboard/Seller/SellerManageProducts";
import PendingOrders from "../pages/Dashboard/Seller/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Seller/ApprovedOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-products",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SellerManageProducts />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <PendingOrders />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ApprovedOrders />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "seller-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SellerRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminManageOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
