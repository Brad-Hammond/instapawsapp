import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={`${styles.Avatar} expanded`}
        src={src}
        width={height}
        height={height}
        alt={text}
      />
      {text}
    </span>
  );
};

// Add displayName for better debugging and compliance with ESLint rules
Avatar.displayName = "Avatar";

// PropTypes validation
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Avatar;
