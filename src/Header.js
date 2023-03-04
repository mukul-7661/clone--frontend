import React, { useState, useEffect } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [showHeaderNav, setShowHeaderNav] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // animation for basket-button
  useEffect(() => {
    if (basket.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [basket]);

  const handleHamburgerClick = () => {
    setShowHeaderNav(!showHeaderNav);
  };

  const handleClick = () => {
    if (showHeaderNav) {
      setShowHeaderNav(false);
    }
  };

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
    handleClick();
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          alt=""
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div
        className={
          showHeaderNav
            ? "header__nav header__nav__mobile hamburger__slide"
            : "header__nav"
        }
      >
        <Link to={!user && "/login"}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option" onClick={handleClick}>
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option" onClick={handleClick}>
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div
            className={
              btnIsHighlighted
                ? "header__optionBasket bump"
                : "header__optionBasket"
            }
            onClick={handleClick}
          >
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>

      <div
        className={
          showHeaderNav ? "hamburger-menu hamburger__slide" : "hamburger-menu"
        }
      >
        <a href="#" onClick={handleHamburgerClick}>
          <MenuIcon className="hamburger__icon" />
        </a>
      </div>

      {showHeaderNav && (
        <div onClick={handleClick} className="hamburger__backdrop"></div>
      )}
    </div>
  );
}

export default Header;
