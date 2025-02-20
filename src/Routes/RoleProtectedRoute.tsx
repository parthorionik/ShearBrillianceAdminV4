import React from "react";
import { Navigate} from "react-router-dom";

interface RoleProtectedRouteProps {
  allowedRoles: any;  // Array of allowed roles
  children: React.ReactNode;  // The child route/component
}


const RoleProtectedRoute = ({ allowedRoles, children }: RoleProtectedRouteProps) => {
  const storedRole = localStorage.getItem("userCategory");
  // let storeRoleInfo;
  // if (storedRole) {
  //   storeRoleInfo = JSON.parse(storedRole);
  // }
  // If the user's role doesn't match the required role, redirect to access denied or login page
  // if (!storedRole || !allowedRoles?.includes(storeRoleInfo.role_name)) {
  if(allowedRoles) {
    if (!storedRole || !allowedRoles?.includes(storedRole)) {
      return <Navigate to="/access-denied" />;
    }
  } else {
    return <Navigate to="/auth-404-basic" />;
  }
  // if (!storedRole || !allowedRoles?.includes(storedRole)) {
  //   return <Navigate to="/access-denied" />;
  // }
  return <>{children}</>;
};


export default RoleProtectedRoute;