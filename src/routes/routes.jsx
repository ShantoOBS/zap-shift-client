import { createBrowserRouter } from "react-router";
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
import Pricing from "../page/Pricing/Pricing";
import PrivateRoutes from "./PrivateRoutes";

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
             path:'/pricing',
             element: <PrivateRoutes> <Pricing></Pricing> </PrivateRoutes> 
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
  }
]);