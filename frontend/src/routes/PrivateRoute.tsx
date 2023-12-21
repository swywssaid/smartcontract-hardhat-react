import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@redux/app/store";

// 로그인 권한이 필요한 라우트
const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
