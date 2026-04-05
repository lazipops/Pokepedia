import { Link, useLocation } from "react-router-dom";
import { SetStateAction, useEffect, useState } from 'react';
import $ from 'jquery';

export function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [dark, setDark] = useState<boolean>(false);
  const location = useLocation();

  // initialize theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (saved === null && prefersDark);
    setDark(isDark);
    document.body.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    // Set the active link based on the current location
    setActiveLink(location.pathname);

    // Function to collapse the navbar
    const handleNavLinkClick = () => {
      if ($('#navbarSupportedContent').hasClass('show')) {
        $('.navbar-toggler').click();
      }
    };

    // Add click event listener to nav links
    $('.nav-link').on('click', handleNavLinkClick);

    // Cleanup event listener on component unmount
    return () => {
      $('.nav-link').off('click', handleNavLinkClick);
    };
  }, [location]);

  const handleLinkClick = (path: SetStateAction<string>) => {
    setActiveLink(path);
  };

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg px-5 fixed-top">
        <Link to="/" className="navbar-brand">
          Pokepedia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                onClick={() => handleLinkClick('/')}
              >
                Pokemon
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${activeLink === '/about' ? 'active' : ''}`}
                onClick={() => handleLinkClick('/about')}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-link nav-link"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              <i className={`fa-solid ${dark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true"></i>
            </button>
          </div>
      </nav>
    </>
  );
}

export default Navbar;
