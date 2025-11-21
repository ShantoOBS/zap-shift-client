import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../page/Home/Home";
import Coverage from "../page/Coverage/Coverage";

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
    ]
  },
]);