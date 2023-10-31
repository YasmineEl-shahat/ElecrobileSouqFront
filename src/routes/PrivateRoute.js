import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login");

    // eslint-disable-next-line
  }, [isAuthenticated, router]);

  return <Component {...rest} />;
};

export default PrivateRoute;
