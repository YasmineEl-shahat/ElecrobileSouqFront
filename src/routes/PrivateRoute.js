import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userRefreshToken } from "../../pages/api/auth";
import { login, logout } from "../redux/reducers/authSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login");
    else {
      // userRefreshToken(
      //   JSON.stringify({
      //     refreshToken: JSON.parse(
      //       JSON.parse(localStorage.getItem("persist:root"))?.refreshToken
      //     ),
      //   })
      // )
      //   .then((res) => {
      //     dispatch(
      //       login({
      //         user: res.data.user,
      //         token: res.data.token,
      //         refreshToken: res.data.refreshToken,
      //       })
      //     );
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // dispatch(logout());
      //     // router.push("/auth/login");
      //   });
    }
    // eslint-disable-next-line
  }, [isAuthenticated, router]);

  return <Component {...rest} />;
};

export default PrivateRoute;
