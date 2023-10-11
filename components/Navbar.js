import Link from "next/link";
import {
  List,
  UserIcon,
  Search,
  FilledHeartIcon,
  CartIcon,
} from "../src/assets/icons";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="d-flex justify-content-center ">
      <div className="mainContainer search-nav">
        <span className="logo-container">
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
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
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
