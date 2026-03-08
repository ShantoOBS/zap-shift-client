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
import PaymentCancel from "../page/Dashboard/PaymentHistory/Components/PaymentCancel";
import PaymentHistory from "../page/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../page/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../page/Dashboard/UsersManagement/UsersManagement";
import AssignedDeliveries from "../page/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../page/Dashboard/CompletedDeliveries/CompletedDeliveries";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../page/Dashboard/AssignRiders/AssignRiders";
import ProfileDetails from "../page/Dashboard/ProfileDetails/ProfileDetails";
import Settings from "../page/Dashboard/Settings/Settings";
import Help from "../page/Dashboard/Help/Help";
import RiderRoute from "./RiderRoute";
import ParcelTrack from "../page/ParcelTrack/ParcelTrack";
import PricingCalculator from "../page/PricingCalculator/PricingCalculator";
import DashboardOverView from "../page/Dashboard/DashboardOverView/DashboardOverView";

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
            path:'/pricing-calculator',
            element: <PricingCalculator></PricingCalculator>
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
          },
          {
            path: 'parcel-track/:trackingId', 
            element: <ParcelTrack></ParcelTrack>
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
           path: 'overview',
           element: <DashboardOverView></DashboardOverView>
         },
         {
          path: 'overview',
          element: <DashboardOverView></DashboardOverView>
         },
         {
           path:'my-parcels',
           element: <MyParcel></MyParcel>
         },
         {
           path: 'profile',
           element: <ProfileDetails></ProfileDetails>
         },
         {
           path: 'settings',
           element: <Settings></Settings>
         },
         {
           path: 'help',
           element: <Help></Help>
         },
         {
          path:'payment-cancel',
          element: <PaymentCancel></PaymentCancel>
         },
         {
          path:'payment-history',
          element: <PaymentHistory></PaymentHistory>
         },

               // rider only routes
      {
        path: 'assigned-deliveries',
        element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },

      // admin only routes
         
         
         {
          path: 'approve-riders',
          element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
         },
         {
          path: 'users-management',
          element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
         },
         {
          path: 'assign-riders',
          element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
         }
       
     ]
  }
]);