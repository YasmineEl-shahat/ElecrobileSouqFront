import Link from "next/link";
import Layout from "../components/Layout";
import { CheckIcon } from "../src/assets/icons";

export async function getServerSideProps() {
  return {
    props: {
      privateRoute: true,
    },
  };
}

const PaidSuccessfully = () => {
  return (
    <main className="d-flex justify-content-center flex-column align-items-center paid-successfully">
      <div className="check mb-5">
        <CheckIcon size={25} />
      </div>

      <h1>Thanks for your order!</h1>
      <Link href="products" passHref>
        <button className="btn--cart mt-5">Continue Shopping</button>
      </Link>
    </main>
  );
};

PaidSuccessfully.getLayout = function getLayout(page) {
  return <Layout title="Paid Successfully">{page}</Layout>;
};

export default PaidSuccessfully;
