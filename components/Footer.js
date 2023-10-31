import {
  YotubeIcon,
  FacebookIcon,
  InstagramIcon,
  TwittwrIcon,
} from "../src/assets/icons";

import Image from "next/image";
import Link from "next/link";

const Footer = ({ categories }) => {
  return (
    <footer className="d-flex justify-content-center pt-5 pb-3">
      <div className="mainContainer ">
        <div className="row text-center text-sm-start">
          <div className="col-sm-6 col-md-5 mb-sm-4 mb-4 mb-md-0">
            <span className="logo-container">
              <Link href="/" passHref>
                <Image
                  src="/assets/logo.png"
                  width={120}
                  height={20}
                  alt="logo"
                />
              </Link>
            </span>

            <h4 className="mt-4">Address</h4>
            <p>street, area name Jordan</p>
            <h4>Email</h4>
            <a href="mailto:contact@electrobilesouq.com">
              <p>contact@electrobilesouq.com</p>
            </a>
            <h4>Telphone</h4>
            <a href="tel:+00 000 000 000">
              <p>(+00) 000 000 000</p>
            </a>
            <div className="icons-wrapper">
              <a href="https://www.facebook.com" passHref target="blank">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.instagram.com" passHref target="blank">
                <InstagramIcon size={18} />
              </a>
              <a href="https://www.twitter.com" passHref target="blank">
                <TwittwrIcon size={18} />
              </a>
              <a href="https://www.youtube.com" passHref target="blank">
                <YotubeIcon size={18} />
              </a>
            </div>
          </div>
          <hr className="d-block d-sm-none" />
          <div className="col-sm-6 col-md-2 mb-sm-4 links">
            <h4 className="mb-4">Categories</h4>
            {categories?.map((category) => (
              <Link
                key={category?.id}
                href={`/products?category=${category?.id}`}
                passHref
              >
                <p className="category">{category?.name}</p>
              </Link>
            ))}
          </div>
          <hr className="d-block d-md-none" />
          <div className="col-sm-6 col-md-2 links">
            <h4 className="mb-4">Useful Links</h4>
            <Link href="/about" passHref>
              <p>About</p>
            </Link>
            <Link href="/contact" passHref>
              <p>Contact</p>
            </Link>
            <Link href="/wishlist" passHref>
              <p>Wishlist</p>
            </Link>
            <Link href="/faq" passHref>
              <p>FAQ</p>
            </Link>
            <Link href="/terms-conditions" passHref>
              <p>Terms&Conditions</p>
            </Link>

            <Link href="/privacy-policy" passHref>
              <p>Privacy Policy</p>
            </Link>
          </div>
          <hr className="d-block d-sm-none" />
          <div className="col-sm-6 col-md-3 links">
            <h4 className="mb-4">Customer Service</h4>

            <Link href="/account" passHref>
              <p>My Account</p>
            </Link>

            <Link href="/cart" passHref>
              <p>My Cart</p>
            </Link>
          </div>
        </div>

        <p className="text-center">
          &copy;Electrobile Souq 2024 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
export default Footer;
