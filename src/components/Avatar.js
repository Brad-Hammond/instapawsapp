import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        width={height}
        height={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;


