import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => statusbar.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
