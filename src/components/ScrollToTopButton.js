import React, { useState, useEffect } from "react";
import styles from "../styles/ScrollToTopButton.module.css";
/*
  ScrollToTopButton Component
  ----------------------------
  - Displays a button to smoothly scroll to the top of the page when clicked.

  Features:
  - Visibility toggles based on the scroll position (visible when scrolled more than 100px).
  - Implements smooth scrolling using `window.scrollTo`.
  - Listens to the `scroll` event using `useEffect` to dynamically update visibility state.
  - Styled dynamically with `styles.Button` and `styles.show` for appearance control.
  - Includes an accessible `aria-label` and Font Awesome icon for user experience.
*/

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`${styles.Button} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
      aria-label="Scrolltotopbutton"
    >
      <span>
        <i className="fa-solid fa-circle-arrow-up"></i>
      </span>
    </button>
  );
};

export default ScrollToTopButton;
