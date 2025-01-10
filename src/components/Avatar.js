import React from "react";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img src={src} width={height} height={height} alt="avatar" />
      {text}
    </span>
  );
};

export default Avatar;
