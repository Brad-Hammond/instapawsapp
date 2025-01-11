import React, { useState } from "react";
import classNames from "classnames";
import styles from "../styles/UserFeedbackCue.module.css";

export default function UserFeedbackCue({ variant, message }) {
  const [isShown, setIsShown] = useState(true);

  const handleClose = () => {
    setIsShown(false);
  };

  if (!isShown) return null;

  return (
    <div
      className={classNames(styles.Alert, styles[variant])}
      role="alert"
      aria-live="polite"
    >
      <span
        className={styles.Close}
        onClick={handleClose}
        role="button"
        aria-label="Close feedback message"
        tabIndex={0}
      >
        &times;
      </span>
      {message}
    </div>
  );
}

UserFeedbackCue.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

UserFeedbackCue.defaultProps = {
  variant: "info",
  message: "",
};
