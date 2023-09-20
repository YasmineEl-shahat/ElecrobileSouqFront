import Layout from "../components/Layout";
import { HeartIcon, UserIcon } from "../src/sharedui/assets/icons";

const Home = () => {
  return (
    <>
      <UserIcon size={20} />
      <HeartIcon size={40} className="text-danger" />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
