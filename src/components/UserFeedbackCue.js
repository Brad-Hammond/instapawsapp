import React, { useState } from "react";
import classNames from "classnames";
import styles from "../styles/UserFeedbackCue.module.css";
import PropTypes from "prop-types";
/*
  UserFeedbackCue Component
  --------------------------
  - Displays a user feedback message with customizable appearance and a close button.

  Props:
  - variant: Determines the styling of the alert (e.g., success, error) using dynamic classes.
  - message: The feedback message to display.

  Features:
  - Manages visibility with local state (`isShown`), hiding the alert when the close button is clicked.
  - Includes accessibility attributes like `role="alert"` and `aria-live="polite"` for screen readers.
  - Styled dynamically with `styles.Alert` and `styles[variant]`.
  - Close button is accessible via `role="button"`, `aria-label`, and `tabIndex`.
*/

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
