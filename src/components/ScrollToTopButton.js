import React, { useState, useEffect } from "react";
import styles from "../styles/ScrollToTopButton.module.css";

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
