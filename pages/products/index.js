import Layout from "../../components/Layout";
import ProductCard from "../../src/sharedui/productCard";
import { searchProduct } from "../api/search";
import { getCategories, getCategory } from "../api/categories";
import { useRouter } from "next/router";
import { getBrands } from "../api/products";
import Rating from "../../src/sharedui/Rating";

export async function getServerSideProps({ query }) {
  const name = query.name || "";
  const category = query.category || "";
  const subCategory = query.subCategory || "";
  const brand = query.brand || "";
  const ratingsAverage = query.ratingsAverage || "";
  const page = query.page || 1;
  const limit = query.limit || 20;

  const products =
    (
      await searchProduct({
        name,
        category,
        brand,
        subCategory,
        page,
        limit,
        ratingsAverage,
      })
    )?.data?.data?.data ?? [];

  let categories = (await getCategories())?.data?.data?.data ?? [];

  let brands = (await getBrands())?.data?.data?.data ?? [];

  let subCategories = null;

  if (category !== undefined)
    subCategories =
      (await getCategory(category))?.data?.data?.data?.subCategories ?? [];

  return {
    props: {
      products,
      categories,
      brands,
      category,
      subCategory,
      brand,
      page,
      limit,
      name,
      subCategories,
      ratingsAverage,
    },
  };
}

const Search = ({
  products,
  categories,
  brands,
  category,
  subCategory,
  brand,
  page,
  limit,
  name,
  subCategories,
  ratingsAverage,
}) => {
  const router = useRouter();
  let ratings = [5, 4, 3, 2, 1];
  const changeCategory = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${id}&brand=${
        brand === undefined ? "" : brand
      }&subCategory=${subCategory === undefined ? "" : subCategory}&limit=${
        limit === undefined ? "" : limit
      }&page=${page === undefined ? "" : page}`
    );
  };
  const changeSubCategory = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&brand=${brand === undefined ? "" : brand}&subCategory=${id}&limit=${
        limit === undefined ? "" : limit
      }&page=${page === undefined ? "" : page}`
    );
  };
  const changeBrand = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${
        subCategory === undefined ? "" : subCategory
      }&brand=${id}&limit=${limit === undefined ? "" : limit}&page=${
        page === undefined ? "" : page
      }`
    );
  };
  const changeRating = (rating) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${limit === undefined ? "" : limit}&page=${
        page === undefined ? "" : page
      }&ratingsAverage=${rating}`
    );
  };
  return (
    <div className="d-flex justify-content-center my-5">
      <main className="mainContainer">
        <div className="row search-container">
          <section className="col-2 filtration">
            <div className="categories filter-card">
              <h3>categories</h3>
              <h4
                className={
                  category === undefined || category === "" ? "selected" : ""
                }
                onClick={() => changeCategory("")}
              >
                all
              </h4>

              {categories.map((item) => (
                <h4
                  key={item.id}
                  className={category === item.id ? "selected" : ""}
                  onClick={() => changeCategory(item.id)}
                >
                  {item.name}
                </h4>
              ))}
            </div>
            {subCategories && subCategories.length > 0 && (
              <div className="filter-card">
                <h3>sub categories</h3>
                <h4
                  className={
                    subCategory === undefined || subCategory === ""
                      ? "selected"
                      : ""
                  }
                  onClick={() => changeSubCategory("")}
                >
                  <input
                    type="checkbox"
                    checked={subCategory === undefined || subCategory === ""}
                    className="form-check-input"
                  />
                  all
                </h4>

                {subCategories.map((item) => (
                  <h4
                    key={item.id}
                    className={subCategory === item.id ? "selected" : ""}
                    onClick={() => changeSubCategory(item._id)}
                  >
                    <input
                      type="checkbox"
                      checked={subCategory === item._id}
                      className="form-check-input"
                    />
                    {item.name}
                  </h4>
                ))}
              </div>
            )}
            <div className="filter-card">
              <h3>brands</h3>
              <h4
                className={
                  brand === undefined || brand === "" ? "selected" : ""
                }
                onClick={() => changeBrand("")}
              >
                <input
                  type="checkbox"
                  checked={brand === undefined || brand === ""}
                  className="form-check-input"
                />
                all
              </h4>

              {brands.map((item) => (
                <h4
                  key={item.id}
                  className={brand === item.id ? "selected" : ""}
                  onClick={() => changeBrand(item._id)}
                >
                  <input
                    type="checkbox"
                    checked={brand === item._id}
                    className="form-check-input"
                  />
                  {item.name}
                </h4>
              ))}
            </div>
            <div className="filter-card">
              <h3>Rating</h3>

              {ratings?.map((rating, index) => (
                <h4
                  key={"rating" + index}
                  className="d-flex align-items-center"
                  onClick={() => changeRating(rating)}
                >
                  <input
                    type="checkbox"
                    checked={rating == ratingsAverage}
                    className="form-check-input"
                  />
                  <Rating ratingsAverage={rating} />
                </h4>
              ))}
            </div>
          </section>

          <section className="col-10 products-container">
            <div className=" row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-md-3 g-4">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
Search.getLayout = function getLayout(page) {
  return <Layout title="Product Search">{page}</Layout>;
};
export default Search;
