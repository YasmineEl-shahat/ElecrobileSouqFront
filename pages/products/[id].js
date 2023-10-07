import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct, getProducts } from "../api/products";
import Layout from "../../components/Layout";
import { image_url } from "../../config/config";
import Rating from "../../src/sharedui/Rating";
const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [images, setImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);

  const { id } = router.query;
  useEffect(() => {
    // getProducts(2).then()

    if (id !== undefined)
      getProduct(id)
        .then((response) => {
          console.log(response.data.data.data);
          setProduct(response.data.data.data);
          setSelectedImg(
            image_url + response.data.data.data.variants[0].imageCover
          );
          const variants = response.data.data.data.variants[0].images.map(
            (image) => {
              return image_url + image;
            }
          );
          setImages([
            image_url + response.data.data.data.variants[0].imageCover,
            ...variants,
          ]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
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
    <div className="d-flex justify-content-center">
      <main className="mainContainer">
        {!loading && (
          <>
            {/* sub header */}
            <ol className="breadcrumb my-5">
              {product?.category && (
                <li className="breadcrumb-item">
                  <Link href={`/search?category=${product?.category}`} passHref>
                    {product?.category}
                  </Link>
                </li>
              )}
              <li className="breadcrumb-item ">
                <Link
                  href={`/search?category=${product?.category}&sub-category=${product?.subCategory}`}
                  passHref
                >
                  {product?.subCategory?.name}
                </Link>
              </li>
              <li className="breadcrumb-item active">{product?.name}</li>
            </ol>

            {/* Product Details */}
            <section className="product-choose-wrapper">
              <div>
                <InnerImageZoom
                  afterZoomIn={() => {
                    change_zoom();
                  }}
                  src={`${images?.[0]}`}
                  zoomSrc={`${images?.[0]}`}
                  alt="prod"
                  zoomType="click"
                  zoomScale={1.5}
                  width={410}
                  height={500}
                />
                <section className="product-choose">
                  {/* eslint-disable */}
                  {images?.map((image, index) => (
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
                </section>
              </div>

              <div className="product-details">
                <h6 className="mb-5">
                  {product?.category && <span>{product?.category},</span>}
                  <span> {product?.subCategory?.name}</span>
                </h6>
                <h2 className="mb-5">{product?.name}</h2>
                <article className="d-flex align-items-center">
                  <Rating ratingsAverage={product?.ratingsAverage} />
                  <span className="rate-average">
                    {product?.ratingsAverage}
                  </span>
                  <span className="rate-quantity">
                    ({product?.ratingsQuantity})
                  </span>
                </article>
                <pre className="my-4 rate-quantity">{product?.description}</pre>
                <h5>Code :{product?.code}</h5>
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
          </>
        )}
      </main>
    </div>
  );
};
Product.getLayout = function getLayout(page) {
  return <Layout title="Product">{page}</Layout>;
};
export default Product;
