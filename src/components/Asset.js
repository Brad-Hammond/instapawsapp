import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Asset.module.css";
import HashLoader from "react-spinners/HashLoader";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <HashLoader color="#588157" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

// PropTypes validation
Asset.propTypes = {
  spinner: PropTypes.bool,
  src: PropTypes.string,
  message: PropTypes.string,
};

// Default props (optional, if needed)
Asset.defaultProps = {
  spinner: false,
  src: null,
  message: "",
};

export default Asset;
