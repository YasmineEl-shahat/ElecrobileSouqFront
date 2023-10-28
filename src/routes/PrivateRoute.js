import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "../../pages/api/auth";
import { login, logout } from "../redux/reducers/authSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login");
    else {
      refreshToken()
        .then((res) => {
          dispatch(login({ user: res.data.user, token: res.data.token }));
        })
        .catch((error) => {
          // dispatch(logout());
          // router.push("/auth/login");
        });
    }
    // eslint-disable-next-line
  }, [isAuthenticated, router]);

  return <Component {...rest} />;
};

export default PrivateRoute;
