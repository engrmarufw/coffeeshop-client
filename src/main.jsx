import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import App from './App.jsx';
import Dashboard from './Components/AdminDashboard/Dashboard/Dashboard.jsx';
import DashboardHome from './Components/AdminDashboard/Dashboard/DashboardHome.jsx';
import AddNewCoffe from './Components/AdminDashboard/ManageCoffee/AddNewCoffe.jsx';
import ManageCoffees from './Components/AdminDashboard/ManageCoffees.jsx';
import ManageOrders from './Components/AdminDashboard/ManageOrders/ManageOrders.jsx';
import ManageUsers from './Components/AdminDashboard/ManageUsers/ManageUsers.jsx';
import AllCoffees from './Components/AllCoffees/AllCoffees.jsx';
import Login from './Components/Authentication/Login.jsx';
import NewPassword from './Components/Authentication/NewPassword.jsx';
import Register from './Components/Authentication/Register.jsx';
import ResetPassword from './Components/Authentication/ResetPassword.jsx';
import Home from './Components/Home/Home.jsx';
import DisplayCoffeeInfo from './Components/Shared/DisplayCoffeeInfo/DisplayCoffeeInfo.jsx';
import PageNotFound from './Components/Shared/PageNotFound.jsx';
import Carts from './Components/UsersDashboard/Carts/Carts.jsx';
import BuyNow from './Components/UsersDashboard/Carts/Orders/BuyNow.jsx';
import DisplayOrders from './Components/UsersDashboard/Carts/Orders/DisplayOrders/DisplayOrders.jsx';
import PlaceOrder from './Components/UsersDashboard/Carts/PlaceOrder.jsx';
import Payment from './Components/UsersDashboard/Payment/Payment.jsx';
import ProfileSetting from './Components/UsersDashboard/ProfileSetting.jsx';
import UserDashboardHome from './Components/UsersDashboard/UserDashboardHome.jsx';
import UsersDashboard from './Components/UsersDashboard/UsersDashboard.jsx';
import AdminRoute from './Protected/AdminRoute.jsx';
import PrivateRoute from './Protected/PrivateRoute.jsx';
import './index.css';
import AuthProvider from './providers/AuthProvider.jsx';
const queryClient = new QueryClient()

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,

      },
      {
        path: "/allcoffees",
        element: <AllCoffees />,

      },
      {
        path: "/allcoffees/:coffeeID",
        element: <DisplayCoffeeInfo />,

      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-pw",
        element: <ResetPassword />,
      },
      {
        path: "/reset-new-pw",
        element: <NewPassword />,
      },
      {
        path: "/carts",
        element: <PrivateRoute><Carts /></PrivateRoute>,
      },
      {
        path: "/placeorder",
        element: <PlaceOrder />,
      },
      {
        path: "/buynow",
        element: <BuyNow />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/myorders",
        element: <DisplayOrders />,
      },
      {
        path: "/profile-setting",
        element: <ProfileSetting />,
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminRoute><Dashboard /></AdminRoute>,
    children: [
      {
        path: "home",
        element: <AdminRoute><DashboardHome /></AdminRoute>,
      },
      {
        path: "managecoffees",
        element: <AdminRoute><ManageCoffees /></AdminRoute>,
      },
      {
        path: "addcoffee",
        element: <AdminRoute><AddNewCoffe /></AdminRoute>,
      },
      {
        path: "manageorders",
        element: <AdminRoute><ManageOrders /></AdminRoute>,
      },
      {
        path: "manageusers",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },

    ]
  },
  {
    path: "userdashboard",
    element: <UsersDashboard />,
    children: [
      {
        path: "home",
        element: <UserDashboardHome />,
      },
      {
        path: "carts",
        element: <PrivateRoute><Carts /></PrivateRoute>,
      },

    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>,
)
