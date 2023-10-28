import Head from "next/head";
import Navbar from "./Navbar";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../src/redux/reducers/categoriesSlice";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { login, logout } from "../src/redux/reducers/authSlice";
import { refreshToken } from "../pages/api/auth";
import { setSavedToken } from "../config/http";

const Layout = ({ title, children }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loader = useSelector((state) => state.categories.loader);

  const ISSERVER = typeof window === "undefined";

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (
      !ISSERVER &&
      localStorage.getItem("persist:root") &&
      JSON.parse(localStorage.getItem("persist:root"))?.token
    ) {
      setSavedToken(
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.token)
      );
      // refreshToken()
      //   .then((res) => {
      //     console.log("refresh", res);
      //     dispatch(login({ user: res.data.user, token: res.data.token }));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     dispatch(logout());
      //   });
    }
  }, [ISSERVER]);

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Electrobile Souq` : "Electrobile Souq"}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="navbarContainer">
            <Navbar categories={categories} />
            <CategoriesNav categories={categories} />
          </div>
          {children}
          <Footer categories={categories} />
        </>
      )}
    </>
  );
};

export default Layout;
