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
            <li className="category" key={category?.id}>
              {category?.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoriesNav;
