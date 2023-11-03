import Layout from "../../components/Layout";
import ProductCard from "../../src/sharedui/productCard";
import { searchProduct } from "../api/search";
import { getCategories, getCategory } from "../api/categories";
import { useRouter } from "next/router";
import { getBrands } from "../api/products";
import Rating from "../../src/sharedui/Rating";
import { getTotalPrice } from "../../src/utils/helpers/getTotalPrice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Pagination from "../../src/sharedui/pagination";

export async function getServerSideProps({ query }) {
  const name = query.name ?? "";
  const category = query.category ?? "";
  const subCategory = query.subCategory ?? "";
  const brand = query.brand ?? "";
  const ratingsAverage = query.ratingsAverage ?? "";
  const page = query.page ?? 1;
  let limit = query.limit ?? 20;
  let minPrice = query.minPrice ?? 0;
  let maxPrice = query.maxPrice ?? 0;
  let sort = query.sort ?? "";
  let lowestPrice = 0;
  let highestPrice = 0;
  let products = [];

  const totalProductsNum = (
    await searchProduct({
      name,
      category,
      brand,
      subCategory,
      ratingsAverage,
      sort,
    })
  )?.data?.results;
  if (limit > totalProductsNum) limit = totalProductsNum;

  const totalPages =
    Math.floor(totalProductsNum / limit) + (totalProductsNum % limit != 0);

  const allProducts =
    (
      await searchProduct({
        name,
        category,
        brand,
        subCategory,
        page,
        limit,
        ratingsAverage,
        sort,
      })
    )?.data?.data?.data ?? [];

  if (allProducts.length) {
    lowestPrice = getTotalPrice(allProducts[0]).totalPrice;
    highestPrice = getTotalPrice(
      allProducts[allProducts.length - 1]
    ).totalPrice;
  }

  if (sort == "-price") {
    let x = lowestPrice;
    lowestPrice = highestPrice;
    highestPrice = x;
  }

  if (!minPrice && !maxPrice) {
    minPrice = lowestPrice;
    maxPrice = highestPrice;
    products = allProducts;
  } else if (!maxPrice) {
    maxPrice = highestPrice;
    products =
      (
        await searchProduct({
          name,
          category,
          brand,
          subCategory,
          page,
          limit,
          ratingsAverage,
          "price[gt]": minPrice,
          sort,
        })
      )?.data?.data?.data ?? [];
  } else if (!minPrice) {
    minPrice = lowestPrice;
    products =
      (
        await searchProduct({
          name,
          category,
          brand,
          subCategory,
          page,
          limit,
          ratingsAverage,
          "price[lt]": maxPrice,
          sort,
        })
      )?.data?.data?.data ?? [];
  } else
    products =
      (
        await searchProduct({
          name,
          category,
          brand,
          subCategory,
          page,
          limit,
          ratingsAverage,
          "price[lt]": maxPrice,
          "price[gt]": minPrice,
          sort,
        })
      )?.data?.data?.data ?? [];

  let categories = (await getCategories())?.data?.data?.data ?? [];

  let brands = (await getBrands())?.data?.data?.data ?? [];

  let subCategories = null;
  let categoryName = null;

  if (category !== undefined && category !== "") {
    let data = (await getCategory(category))?.data?.data?.data ?? {};
    subCategories = data?.subCategories;
    categoryName = data?.name;
  }

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
      categoryName,
      ratingsAverage,
      minPrice,
      maxPrice,
      lowestPrice,
      highestPrice,
      totalProductsNum,
      sort,
      totalPages,
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
  categoryName,
  ratingsAverage,
  minPrice,
  maxPrice,
  lowestPrice,
  highestPrice,
  totalProductsNum,
  sort,
  totalPages,
}) => {
  const router = useRouter();
  let ratings = [5, 4, 3, 2, 1];

  const changeCategory = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${id}&brand=${
        brand === undefined ? "" : brand
      }&subCategory=${
        subCategory === undefined || id === "" ? "" : subCategory
      }&limit=${limit === undefined ? "" : limit}&page=1&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${sort === undefined ? "" : sort}`
    );
  };
  const changeSubCategory = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&brand=${brand === undefined ? "" : brand}&subCategory=${id}&limit=${
        limit === undefined ? "" : limit
      }&page=1&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${sort === undefined ? "" : sort}`
    );
  };
  const changeBrand = (id) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${
        subCategory === undefined ? "" : subCategory
      }&brand=${id}&limit=${
        limit === undefined ? "" : limit
      }&page=1&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${sort === undefined ? "" : sort}`
    );
  };
  const changeRating = (rating) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${
        limit === undefined ? "" : limit
      }&page=1&ratingsAverage=${rating}&sort=${sort === undefined ? "" : sort}`
    );
  };
  const changePrice = (range) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${limit === undefined ? "" : limit}&page=1&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&minPrice=${range[0]}&maxPrice=${range[1]}&sort=${
        sort === undefined ? "" : sort
      }`
    );
  };

  const changeLimit = (e) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${e.target.value}&page=1&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${sort === undefined ? "" : sort}`
    );
  };

  const changeSort = (e) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${limit === undefined ? "" : limit}&page=${
        page === undefined ? "" : page
      }&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${e.target.value}`
    );
  };

  const changePage = (data) => {
    router.push(
      `/products?name=${name === undefined ? "" : name}&category=${
        category === undefined ? "" : category
      }&subCategory=${subCategory === undefined ? "" : subCategory}&brand=${
        brand === undefined ? "" : brand
      }&limit=${limit === undefined ? "" : limit}&page=${
        data.selected + 1
      }&ratingsAverage=${
        ratingsAverage === undefined ? "" : ratingsAverage
      }&sort=${sort === undefined ? "" : sort}`
    );
  };
  return (
    <div className="d-flex justify-content-center my-5">
      <main className="mainContainer">
        <div className="row search-container">
          <section className="col-lg-2 col-md-3 col-sm-4 filtration">
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
              <h4
                className={
                  ratingsAverage === undefined || ratingsAverage === ""
                    ? "selected"
                    : ""
                }
                onClick={() => changeRating("")}
              >
                <input
                  type="checkbox"
                  checked={
                    ratingsAverage === undefined || ratingsAverage === ""
                  }
                  className="form-check-input"
                />
                all
              </h4>
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
            <div className="filter-card">
              <h3>Price</h3>

              <Slider
                range
                min={Number(lowestPrice)}
                max={Number(highestPrice)}
                defaultValue={[minPrice, maxPrice]}
                onChange={changePrice}
                className="mb-4"
              />
              <h4>
                price: ${minPrice} - ${maxPrice}
              </h4>
            </div>
          </section>
          <section className="col-lg-10 col-md-9 col-sm-8 products-container">
            <div className="info-wrapper">
              <article className="d-flex justify-content-between">
                <h1>{categoryName ?? "All Categories"}</h1>
                <h3>
                  Showing <b>1-{limit} </b>of <b>{totalProductsNum}</b>
                </h3>
              </article>
              <hr />
              <article className="d-flex justify-content-end">
                <label className="mx-4" htmlFor="sort">
                  <select
                    className="form-control"
                    id="sort"
                    onChange={changeSort}
                  >
                    <option value="price" default>
                      Default Sort
                    </option>
                    <option value="price" selected={sort == "price"}>
                      Price:low to high
                    </option>
                    <option value="-price" selected={sort == "-price"}>
                      Price:high to low
                    </option>
                  </select>
                  <div className="dropdown-arrow"></div>
                </label>
                <label>
                  <div className="form-control">
                    <input
                      type="number"
                      min={1}
                      max={totalProductsNum}
                      value={limit}
                      onChange={changeLimit}
                    />
                    products/page
                  </div>
                </label>
              </article>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-md-3 g-4">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            <div className="info-wrapper mt-4">
              <article className="d-flex justify-content-between">
                <h3>
                  Showing <b>1-{limit} </b>of <b>{totalProductsNum}</b>
                </h3>

                {totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    pageNumber={page}
                    pageChangeHandler={changePage}
                  />
                )}
              </article>
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
