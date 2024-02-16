import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = useSelector(
    (state: RootState) => state.authSliceReducer.userInfo
  );

  if (userInfo && userInfo.isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
