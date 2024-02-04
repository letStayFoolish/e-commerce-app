import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = useSelector((state: RootState) => state.authSliceReducer);

  console.log("USER INFO: ", userInfo);

  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
