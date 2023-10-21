import Layout from "../../components/Layout";
import { searchProduct } from "../api/search";

export async function getServerSideProps({ query }) {
  const name = query.name || "";
  const category = query.category || "";
  const brand = query.brand || "";
  const page = 1;
  const limit = 20;

  const products =
    (await searchProduct({ name, category, brand, page, limit }))?.data?.data
      ?.data ?? [];

  return {
    props: { products },
  };
}
const Search = ({}) => {
  return <main></main>;
};
Search.getLayout = function getLayout(page) {
  return <Layout title="Product Search">{page}</Layout>;
};
export default Search;
