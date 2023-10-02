import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct } from "../api/products";
import Layout from "../../components/Layout";

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const { id } = router.query;
  useEffect(() => {
    getProduct(id)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setProduct({
      category: "smartphone",
      subCategory: "Telephones",
      name: "iphone 14 pro",
      images: [
        "http://localhost:3001/assets/products/1.png",
        "http://localhost:3001/assets/products/2.png",
        "http://localhost:3001/assets/products/3.png",
        "http://localhost:3001/assets/products/4.png",
      ],
    });
    setSelectedImg("http://localhost:3001/assets/products/1.png");
    // eslint-disable-next-line
  }, [id]);

  const change_img = (e) => {
    let mainContainer = document.getElementsByClassName("iiz__img")[0];
    mainContainer.src = e.target.src;
    setSelectedImg(e.target.src);
  };
  const change_zoom = () => {
    let src = document.getElementsByClassName("iiz__img")[0].src;
    let mainContainer = document.getElementsByClassName("iiz__zoom-img")[0];
    mainContainer.src = src;
  };

  return (
    !loading && (
      <div className="d-flex justify-content-center">
        <main className="mainContainer">
          {/* sub header */}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href={`/search?category=${product?.category}`} passHref>
                {product?.category ?? "Category"}
              </Link>
            </li>
            <li className="breadcrumb-item ">
              <Link
                href={`/search?category=${product?.category}&sub-category=${product?.subCategory}`}
                passHref
              >
                {product?.subCategory ?? "sub category"}
              </Link>
            </li>
            <li className="breadcrumb-item active">
              {product?.name ?? "product name"}
            </li>
          </ol>

          {/* Product Details */}
          <section className="product-choose-wrapper">
            <div className="prodChoose">
              {/* eslint-disable */}
              {product?.images?.map((image, index) => (
                <img
                  key={`image ${index}`}
                  onClick={(e) => {
                    change_img(e);
                  }}
                  src={image}
                  alt="product image"
                  className={image == selectedImg && "selected"}
                />
              ))}
            </div>
            <InnerImageZoom
              afterZoomIn={() => {
                change_zoom();
              }}
              src={`${product?.images?.[0]}`}
              zoomSrc={`${product?.images?.[0]}`}
              alt="prod"
              zoomType="click"
              zoomScale={1.5}
              width={410}
              height={500}
            />
            <div className=" productDetails">
              <h2>{product?.name}</h2>
              <div className="subDetail">
                <h5>
                  <span>Code : </span>
                  {product?.code}
                </h5>
                {product?.size && (
                  <h5>
                    <span>Available size : </span>
                    {product?.size}
                  </h5>
                )}
                {product?.quantity && (
                  <h5>
                    <span>Quantity : </span>
                    {product?.quantity}
                  </h5>
                )}
                {product?.materials && (
                  <h5>
                    <span>Materials:</span>
                    {product?.materials}
                  </h5>
                )}
              </div>
              <div className="subDetail">
                <h5>
                  <span>Country of Origin : </span>
                  {product?.["country_of_origin"]}
                </h5>
                <h5>
                  {product?.color?.length > 0 && (
                    <div>
                      <span>Colors : </span>{" "}
                      {product.color.map((color) => (
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
                  {product?.parteners?.length > 0 && (
                    <div>
                      <span>Certification: </span>{" "}
                      {product.parteners.map((partner) => (
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
                <button className="btn--global btn--big">
                  <i className="fa-solid fa-bag-shopping"></i>Request Product
                </button>
              </div>
            </div>
          </section>

          {/* Product Description */}
          <section className="row des">
            <h4>Description</h4>

            <pre>{product?.description}</pre>
          </section>
        </main>
      </div>
    )
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
