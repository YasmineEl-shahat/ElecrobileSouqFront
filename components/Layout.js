import Head from "next/head";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title | "Electrobile Souq" : "Electrobile Souq"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />

      {children}
    </>
  );
};

export default Layout;
