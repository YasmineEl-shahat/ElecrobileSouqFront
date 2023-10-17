import Layout from "../components/Layout";

export async function getServerSideProps() {
  return {
    props: {
      privateRoute: true,
    },
  };
}

const Cart = () => {
  return (
    <main className="d-flex justify-content-center">
      <div className="mainContainer"></div>
    </main>
  );
};

Cart.getLayout = function getLayout(page) {
  return <Layout title="Cart">{page}</Layout>;
};

export default Cart;
