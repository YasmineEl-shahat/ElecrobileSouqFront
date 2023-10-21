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
import CustomModal from "../src/sharedui/modal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/redux/reducers/authSlice";
import { image_url } from "../config/config";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const wishlistHandler = () => {
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else router.push("/wishlist");
  };

  const cartHandler = () => {
    if (!isAuthenticated) setIsLoginModalOpen(true);
    else router.push("/cart");
  };
  const submitSearchHandler = (e) => {
    e.preventDefault();
    const name = document.getElementById("search").value;
    const category = document.getElementById("category").value;
    if (name) {
      if (category)
        router.push("/products?name=" + name + "&category=" + category);
      else router.push("/products?name=" + name);
    }
  };
  return (
    <>
      <nav className="d-flex justify-content-center">
        <div className="mainContainer search-nav">
          <span className="d-flex logo-container">
            <List size={20} />
            <Link href="/" passHref>
              <Image
                src="/assets/logo.png"
                width={120}
                height={20}
                alt="logo"
              />
            </Link>
          </span>
          <form className="search-form" onSubmit={submitSearchHandler}>
            <input
              type="text"
              className="search"
              name="search"
              id="search"
              placeholder="Search for products"
            ></input>
            <label className="search-category" htmlFor="categories">
              <select className="form-control" id="category">
                <option value="" default>
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
            {user ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.firstName + " " + user?.lastName}
                  <Image
                    src={image_url + user?.image}
                    alt="profile"
                    width={20}
                    height={20}
                  />
                </button>
                <ul
                  className="dropdown-menu  w-100"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      onClick={() => dispatch(logout())}
                      className="dropdown-item"
                      href="#"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button>
                {" "}
                <UserIcon size={15} />
              </button>
            )}

            <button onClick={wishlistHandler}>
              <FilledHeartIcon size={15} />
            </button>
            <button onClick={cartHandler}>
              <CartIcon size={15} />
              <span>$0.00</span>
            </button>
          </span>
        </div>
      </nav>
      <CustomModal
        isModalOpen={isLoginModalOpen}
        handleCancel={() => setIsLoginModalOpen(false)}
      >
        <p className="text-center my-5 modal-text">
          You are not login , Please Login
        </p>
        <Link href="/auth/login" passHref>
          <button
            className="btn--cart w-100"
            onClick={() => setIsLoginModalOpen(false)}
          >
            LOGIN
          </button>
        </Link>
      </CustomModal>
    </>
  );
};

export default Navbar;
