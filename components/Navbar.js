import {List , UserIcon, HeartIcon,Search } from "../src/assets/icons";
import "bootstrap/dist/css/bootstrap.css";
const Navbar = () => {
 

  return(
  <>
  <nav  > 
    <div className="contain">
    <div className="maincontainer">
  
      <span className="list">
       <a> <List/></a>
      </span>
      
<span className="logo">
  <a href="/">
      <p className="blueText "><b>Elctrobile</b></p>
      <p className="orangeText "><b>SouQ</b></p>
      </a>
      </span>
<span className="wrapper">
     
      <input type="text" className="search" placeholder="search for products"></input>
      <Search className="search-icon" />
      </span>


        <span className="">
        <span className="">
      <UserIcon className=""/>
      </span>
      <span className="icon">
      <HeartIcon  className="" />
      </span>
      </span>
    </div>
    </div>
    </nav>
  </>
  )
};

export default Navbar;
