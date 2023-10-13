import Link from "next/link";
import {
  List,
  UserIcon,
  Search,
  FilledHeartIcon,
  CartIcon,
} from "../src/assets/icons";
import Image from "next/image";
import { getCategories } from "../pages/api/categories";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    <nav className="d-flex justify-content-center">
      <div className="mainContainer search-nav">
        <span className="d-flex logo-container">
          <List size={20} />
          <Link href="/" passHref>
            <Image src="/assets/logo.png" width={120} height={20} alt="logo" />
          </Link>
        </span>
        <form className="search-form">
          <input
            type="text"
            className="search"
            placeholder="Search for products"
          ></input>
          <label className="search-category" htmlFor="categories">
            <select className="form-control" id="categories">
              <option value="all" default>
                All Categories
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="dropdown-arrow"></div>
          </label>
          <button type="submit">
            <Search size={20} />
          </button>
        </form>

        <span className="icons-wrapper">
          <UserIcon size={15} />
          <FilledHeartIcon size={15} />
          <CartIcon size={15} />
          <span>$0.00</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
