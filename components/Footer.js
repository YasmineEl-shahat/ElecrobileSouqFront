import {YotubeIcon , FacebookIcon, InstagramIcon,TwittwrIcon } from "../src/assets/icons";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
//import a from "next/a";
const Footer = () => {
 
    const ToFace = () => {
        window.open("http://www.facebook.com/", "_blank");
      };
      const ToTwitt = () => {
        window.open("http://www.twitter.com/", "_blank");
      };
      const ToInsta = () => {
        window.open("http://www.instagram.com/", "_blank");
      };
      const ToYoutube = () => {
        window.open("http://www.yotube.com/", "_blank");
      };
  return(
  <>
   <footer >
  <div className="main-footer">
    <div className="container">
        <div className="row">


    <div className="col">

     <div className="big-logo">
    <a href="/">
      <p className="blueText"><b>Elctrobile</b></p>
      <p className="orangeText"><b>SouQ</b></p>
      </a>
      </div>
      <br/>
      
      <ul>
      <p><b>Adress</b></p>
        <li className="">street, area name Jordan</li><br/>
        <p><b>Email</b></p><br/>
        <li>contact@electrobilesouq.com</li><br/>
        <p><b>Telphone</b></p><br/>
        <li>(+00) 000 000 000</li><br/>
        <li className="icons">
            <a  onClick={ToFace} passHref  className="footerIcons">
            <FacebookIcon/>
            </a>
            <a onClick={ToInsta} passHref  className="footerIcons">
            <InstagramIcon/>
            </a>
            <a onClick={ToTwitt}  className="footerIcons">
            <TwittwrIcon/>
            </a>
            <a  onClick={ToYoutube} passHref className="footerIcons">
            <YotubeIcon/>
            </a>
        </li>
      </ul>
     </div>
            <div className="col">

            <ul>
        <p><b>Ctegories</b></p><br/><br/>
        <li> <a>Tv&Audio</a></li>
        <li><a>Smartphones</a></li>
        <li><a>Laptops</a></li>
        <li><a>Photo&Video</a></li>
        <li><a>Gifts</a></li>
        <li><a>Books</a></li>
        <li><a>Toys</a></li>
      </ul>


            </div>

            <div className="col">

            <ul>
            <p><b>Useful Links</b></p><br/><br/>
        <li> <a>About</a></li>
        <li><a>Contact</a></li>
        <li><a>Whishlist</a></li>
        <li> <a>FAQ</a></li>
        <li><a>Terms&Conditions</a></li>
        <li><a>Privacy Policy</a></li>
        
      </ul>

            </div>
            <div className="col">
            <ul>
            <p><b>Customer Service</b></p><br/><br/>
        <li> <a>My Account</a></li>
        <li><a>My Cart</a></li>
      
      </ul>


            </div>

            
        </div>
        
        <div className="row">
       <div className="copy"><p> &copy;Electrobile Souq 2024 - All Rights Reserved</p></div>

        </div>
    </div>
  </div>
 
      </footer>
  </>
  )
};
export default Footer;