import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { getProduct, getProducts } from "../api/products";
import Layout from "../../components/Layout";
import { image_url } from "../../config/config";
import Rating from "../../src/sharedui/Rating";
import { CheckIcon } from "../../src/assets/icons";
const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [images, setImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);

  const { id } = router.query;
  useEffect(() => {
    // getProducts(2).then()

    if (id !== undefined)
      getProduct(id)
        .then((response) => {
          const data = response.data.data.data;
          console.log(data);
          setProduct(data);
          setSelectedColor(data.variants[0].color);
          setColors(data.variants.map((variant) => variant.color));
          setSelectedVariant(data.variants[0]);
          setSelectedImg(image_url + data.variants[0].imageCover);
          const images = data.variants[0].images.map((image) => {
            return image_url + image;
          });
          setImages([image_url + data.variants[0].imageCover, ...images]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line
  }, [id]);

  const changeColor = (color) => {
    setSelectedColor(color);
    const variant = product.variants.find((variant) => variant.color === color);
    setSelectedVariant(variant);
    setSelectedImg(image_url + variant.imageCover);
    const images = variant.images.map((image) => {
      return image_url + image;
    });
    setImages([image_url + variant.imageCover, ...images]);
  };
  const changeImg = (e) => {
    let mainContainer = document.getElementsByClassName("iiz__img")[0];
    mainContainer.src = e.target.src;
    setSelectedImg(e.target.src);
  };
  const changeZoom = () => {
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
              {product?.subCategory?.category && (
                <li className="breadcrumb-item">
                  <Link
                    href={`/search?category=${product?.subCategory?.category?.id}`}
                    passHref
                  >
                    {product?.subCategory?.category?.name}
                  </Link>
                </li>
              )}
              <li className="breadcrumb-item ">
                <Link
                  href={`/search?category=${product?.subCategory?.category?.id}&sub-category=${product?.subCategory?.id}`}
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
                    changeZoom();
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
                        changeImg(e);
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
                  {product?.subCategory?.category && (
                    <span>{product?.subCategory?.category?.name},</span>
                  )}
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

                <h5 className="mb-4">
                  <span className="rate-quantity">SKU : </span>
                  <span className="rate-average"> {selectedVariant?.sku}</span>
                </h5>

                <h5 className="mb-4 rate-average mx-0">
                  <b>Brand</b>
                </h5>

                <h1 className="brand mb-5">{product?.brand?.name}</h1>

                {colors?.length > 0 && (
                  <>
                    <h5 className="mb-4 rate-average mx-0">
                      <b>Colors</b>
                    </h5>
                    <article className="d-flex">
                      {colors.map((color) => (
                        <div
                          className="color"
                          key={color}
                          style={{ background: color }}
                          onClick={() => changeColor(color)}
                        >
                          {color == selectedColor && (
                            <CheckIcon
                              size={20}
                              style={{
                                color: color != "white" && "white",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </article>
                  </>
                )}
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
