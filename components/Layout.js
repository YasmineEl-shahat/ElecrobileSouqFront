import Head from "next/head";
import Navbar from "./Navbar";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../src/redux/reducers/categoriesSlice";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { login, logout } from "../src/redux/reducers/authSlice";
import { userRefreshToken } from "../pages/api/auth";
import {
  setSavedToken,
  setRefreshToken,
  refreshToken,
  savedToken,
} from "../config/http";
import { checkToken } from "../src/utils/helpers/checkToken";

const Layout = ({ title, children }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loader = useSelector((state) => state.categories.loader);

  const ISSERVER = typeof window === "undefined";

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  async function refreshTokenAndReload(dispatch, router) {
    try {
      // Perform the refresh token operation
      const res = await userRefreshToken();

      // Dispatch the new token and user data
      dispatch(
        login({
          user: res.data.user,
          token: res.data.token,
          refreshToken: res.data.refreshToken,
        })
      );

      // Reload the page
      router.reload();
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  }

  useEffect(() => {
    if (
      !ISSERVER &&
      localStorage.getItem("persist:root") &&
      JSON.parse(localStorage.getItem("persist:root"))?.token
    ) {
      setSavedToken(
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.token)
      );
      setRefreshToken(
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:root"))?.refreshToken
        )
      );
      const checkAndRefreshToken = () => {
        if (!checkToken(refreshToken)) dispatch(logout());
        else if (!checkToken(savedToken)) refreshTokenAndReload();
      };
      checkAndRefreshToken();
      // Set an interval to check and refresh the token every 4 hours
      const tokenIntervalId = setInterval(
        checkAndRefreshToken,
        4 * 60 * 60 * 1000
      ); // 4 hours in milliseconds

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(tokenIntervalId);
      };
    }
  }, []);

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
