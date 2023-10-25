import Link from "next/link";
import { getCategories } from "../pages/api/categories";
import { useEffect, useState } from "react";

const CategoriesNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="d-flex justify-content-center categories-nav">
      <div className="mainContainer">
        <ul className="list">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              href={`/products?category=${category?.id}`}
              passHref
            >
              <li className="category">
                {category?.name}
                <div className="dropdown-arrow"></div>
                {category?.subCategories.length > 0 && (
                  <ul className="subcategories">
                    {category?.subCategories?.map((subcategory) => (
                      <Link
                        key={subcategory?.id}
                        href={`/products?category=${category?.id}&subCategory=${subcategory?.id}`}
                        passHref
                      >
                        <li className="subcategory">{subcategory?.name}</li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoriesNav;
