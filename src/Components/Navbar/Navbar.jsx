import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo (1).png";

export default function Navbar({ userData, logout }) {
  return (
    <>
      <nav className="navbar position-fixed top-0 w-100 start-0 navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="" />
            <span className="website-name-logo">Game Over</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/games/all">
                      All
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Platforms
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/games/platform/pc">
                          pc
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/platform/browser"
                        >
                          browser
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort-by
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/sort-by/release-date"
                        >
                          release-date
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/sort-by/popularity"
                        >
                          popularity
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/sort-by/alphabetical"
                        >
                          alphabetical
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/sort-by/relevance"
                        >
                          relevance
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/racing"
                        >
                          racing
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/sports"
                        >
                          sports
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/social"
                        >
                          social
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/shooter"
                        >
                          shooter
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/open-world"
                        >
                          open-world
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/sports"
                        >
                          sports
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/zombie"
                        >
                          zombie
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/fantasy"
                        >
                          fantasy
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/action-rpg"
                        >
                          action-rpg
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/action"
                        >
                          action
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/flight"
                        >
                          flight
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/games/category/battle-royale"
                        >
                          battle-royale
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      className="nav-link  text-info btn btn-outline-info cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
