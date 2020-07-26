import React, { useContext } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./header.scss";
import { FirebaseContext } from "../Firebase";
import Button from "../UI/Button";

const Header = ({ location, history }) => {
  const { authUser, firebase } = useContext(FirebaseContext);

  const handleLogout = async () => {
    await firebase.logout();
    localStorage.removeItem("tweetxUser");
    history.push("/login");
  };
  return (
    <div
      className={`header ${
        location.pathname === "/signup" || location.pathname === "/login"
          ? "no_shadow"
          : ""
      }`}
    >
      <div className="header__container">
        <div className="header__logo">
          <NavLink to="/feed">
            <span>TweetX</span>
          </NavLink>
        </div>
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          ""
        ) : (
          <div className="header__menus">
            <NavLink
              to="/feed"
              className={`header__menus_link ${
                location.pathname === "/feed" ? "active" : ""
              }`}
            >
              Feed
            </NavLink>
            <NavLink
              to="/users"
              className={`header__menus_link ${
                location.pathname === "/users" ? "active" : ""
              }`}
            >
              Users
            </NavLink>
            <NavLink
              to="/profile"
              className={`header__menus_link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </NavLink>

            {authUser && (
              <Button
                className="header__menus__logout__button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
