import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct } from "../api/products";
import Layout from "../../components/Layout";

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(router.query.id);
  useEffect(() => {
    // getProduct().then((res) => {
    //   setLoading(false);
    // });
    // eslint-disable-next-line
  }, [router]);

  const change_img = (e) => {
    let mainContainer = document.getElementsByClassName("iiz__img")[0];
    mainContainer.src = e.target.src;
  };
  const change_zoom = () => {
    let src = document.getElementsByClassName("iiz__img")[0].src;
    let mainContainer = document.getElementsByClassName("iiz__zoom-img")[0];
    mainContainer.src = src;
  };

  return (
    !loading && (
      <main className="mainContainer">
        {/* sub header */}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" passHref>
              Main Page
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/products/${router.query.categoryid}`} passHref>
              {router.query.categoryid}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            <Link
              href={`/products/${router.query.categoryid}/${router.query.subCategoryid}`}
              passHref
            >
              {router.query.subCategoryid}
            </Link>
          </li>
        </ol>

        {/* Product Details */}
        <section className="producc">
          <div className="prodChoose">
            {/* eslint-disable */}
            {product[0].images.map((image) => (
              <img
                key={image.image}
                onClick={(e) => {
                  change_img(e);
                }}
                tabIndex="0"
                src={`${image.image}`}
                alt="prod"
              />
            ))}
          </div>
          <InnerImageZoom
            afterZoomIn={() => {
              change_zoom();
            }}
            src={`${product[0].images[0].image}`}
            zoomSrc={`${product[0].images[0].image}`}
            alt="prod"
            zoomType="click"
            zoomScale={1.5}
            width={410}
            height={500}
          />
          <div className=" productDetails">
            <h2>{product[0].name}</h2>
            <div className="subDetail">
              <h5>
                <span>Code : </span>
                {product[0].code}
              </h5>
              {product[0].size && (
                <h5>
                  <span>Available size : </span>
                  {product[0].size}
                </h5>
              )}
              {product[0].quantity && (
                <h5>
                  <span>Quantity : </span>
                  {product[0].quantity}
                </h5>
              )}
              {product[0].materials && (
                <h5>
                  <span>Materials:</span>
                  {product[0].materials}
                </h5>
              )}
            </div>
            <div className="subDetail">
              <h5>
                <span>Country of Origin : </span>
                {product[0]["country_of_origin"]}
              </h5>
              <h5>
                {product[0].color.length > 0 && (
                  <div>
                    <span>Colors : </span>{" "}
                    {product[0].color.map((color) => (
                      <div className="colWrap" key={color.code}>
                        <div
                          className="colCont"
                          style={{ background: color.code }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </h5>
              <h5>
                {product[0].parteners.length > 0 && (
                  <div>
                    <span>Certification: </span>{" "}
                    {product[0].parteners.map((partner) => (
                      <div className="colWrap" key={partner.id}>
                        <div className="cerCont">
                          {/* eslint-disable */}
                          <img
                            src={`${partner.partener.image}`}
                            alt="certificate"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </h5>
            </div>
            <div className="reqWrap">
              <span className="price">Price on request</span>
              <button onClick={pop} className="btn--global btn--big">
                <i className="fa-solid fa-bag-shopping"></i>Request Product
              </button>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="row des">
          <h4>Description</h4>

          <pre>{product[0].description}</pre>
        </section>

        <div id="popup" className="pop">
          <h3>Request a product</h3>
          <div className="dataWrap">
            <span>
              Product Name: <span className="data">{product[0].name}</span>
            </span>
            <span>
              Product Code: <span className="data">{product[0].code}</span>
            </span>
          </div>
        </div>
      </main>
    )
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
