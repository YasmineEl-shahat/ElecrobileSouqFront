import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title | "Electrobile Souq" : "Electrobile Souq"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {children}
    </>
  );
};

export default Layout;
