import Head from "next/head";
import Navbar from "./Navbar";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../src/redux/reducers/categoriesSlice";
import Spinner from "./Spinner";
import { useEffect } from "react";

const Layout = ({ title, children }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loader = useSelector((state) => state.categories.loader);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);
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
