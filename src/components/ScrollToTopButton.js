import React, { useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <button style={{ display: isVisible ? "block" : "none" }}>
      Scroll to Top
    </button>
  );
};

export default ScrollToTopButton;
