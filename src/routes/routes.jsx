import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home";
import Coverage from "../page/Coverage/Coverage";
import About from "../page/About/About";
import AuthLayout from "../layout/AuthLayout";
import Login from "../page/Auth/Login";
import Register from "../page/Auth/Register";
import ForgetPassword from "../page/Auth/ForgetPassword";
import EnterCode from "../page/Auth/EnterCode";
import ResetPassword from "../page/Auth/ResetPassword";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../page/Rider/Rider";
import SendParcel from "../page/SendParcel/SendParcel";
import DashBoardLayout from "../layout/DashBoardLayout";
import MyParcel from "../page/Dashboard/MyParcel/MyParcel";
import PaymentCancel from "../page/Dashboard/PaymentCancel";
import PaymentHistory from "../page/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../page/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../page/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
          {
            index:true,
            element: <Home></Home>
          },
           {
            path:'/coverage',
            loader: ()=>fetch('/warehouses.json').then(res=>res.json()),
            element: <Coverage></Coverage>
          },
          {
            path:'/about',
            element: <About></About>
          },
          {
            path:'/rider',
            loader: () => fetch('/warehouses.json').then((res) => res.json()),
            element: <PrivateRoutes><Rider /></PrivateRoutes>
          },
          {
             path:'/send-parcel',
             loader: ()=>fetch('/warehouses.json').then(res=>res.json()),
             element: <PrivateRoutes> <SendParcel></SendParcel> </PrivateRoutes> 
          }
    ]
  },
  {
    path:'/',
    element: <AuthLayout></AuthLayout>,
    children:[
         
        {
            path:'/login',
            element: <Login></Login>
        },
        {
          path:'/register',
          element: <Register></Register>
        },
        {
          path:'/forget',
          element: <ForgetPassword></ForgetPassword>
        },
        {
          path:'/enter-code',
          element: <EnterCode></EnterCode>
        },
         {
          path:'/reset-password',
          element: <ResetPassword></ResetPassword>
        }
    ]
  },{

     path:'dashboard',
     element:<PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
     children:[
         {
           index: true,
           element: <Navigate to="/dashboard/my-parcels" replace />
         },
         {
           path:'my-parcels',
           element: <MyParcel></MyParcel>
         },
         {
          path:'payment-cancel',
          element: <PaymentCancel></PaymentCancel>
         },
         {
          path:'payment-history',
          element: <PaymentHistory></PaymentHistory>
         },{
          path: 'approve-riders',
          element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
         },
         {
          path: 'users-management',
          element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
         }
       
     ]
  }
]);