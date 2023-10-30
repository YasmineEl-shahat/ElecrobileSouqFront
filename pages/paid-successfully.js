import Layout from "../components/Layout";

export async function getServerSideProps() {
  return {
    props: {
      privateRoute: true,
    },
  };
}

const PaidSuccessfully = () => {
  return (
    <main className="d-flex justify-content-center">
      <div className="mainContainer my-5"></div>{" "}
    </main>
  );
};

PaidSuccessfully.getLayout = function getLayout(page) {
  return <Layout title="Paid Successfully">{page}</Layout>;
};

export default PaidSuccessfully;
