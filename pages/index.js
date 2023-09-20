import Layout from "../components/Layout";

const Home = () => {
  return <></>;
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
