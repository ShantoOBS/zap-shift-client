import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoutes({children}) {
   
  const {user,loading}  =useAuth();
  const location =useLocation();

  if(loading)return <div><span className="loading loading-spinner loading-xl"></span></div>

  if(!user)return <Navigate state={location.pathname} to='/login'></Navigate>
  
  return children;
 
  
}
