import Head from "next/head";
import Navbar from "./Navbar";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";
import Home from "../pages";
const Layout = ({ title, categories, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Electrobile Souq` : "Electrobile Souq"}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="navbarContainer">
        <Navbar />
        <CategoriesNav />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
