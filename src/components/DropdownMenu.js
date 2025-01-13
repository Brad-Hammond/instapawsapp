import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { TbGridDots } from "react-icons/tb";
import styles from "../styles/DropdownMenu.module.css";

/*
  DropdownSelect Component
  -------------------------
  - This is a functional React component that uses `React.forwardRef` to forward the ref 
    to the button element.

  Props:
  - onClick: A callback function executed when the button is clicked.
  - ref: A forwarded ref to allow a parent component to access the button element.

  Features:
  - Prevents the default behavior of the button's click event using `e.preventDefault()`.
  - Executes the `onClick` callback passed as a prop after preventing the default behavior.
  - Applies the `styles.DropdownToggle` class to style the button.

  Note:
  - This component uses the `TbGridDots` icon as its visual content.
*/

const DropdownSelect = React.forwardRef(({ onClick }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={styles.DropdownToggle}
  >
    <TbGridDots />
  </button>
));

DropdownSelect.displayName = "DropdownSelect";

DropdownSelect.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const DropdownMenu = ({ handleEdit, handleDelete }) => (
  <Dropdown className={styles.Dropdown} drop="right">
    <Dropdown.Toggle as={DropdownSelect} />
    <Dropdown.Menu className={styles.DropdownPosition}>
      <Dropdown.Item
        className={styles.DropdownItem}
        onClick={handleDelete}
        aria-label="remove post"
      >
        <i className="fas fa-eraser" />
        Delete
      </Dropdown.Item>
      <Dropdown.Item
        className={styles.DropdownItem}
        onClick={handleEdit}
        aria-label="edit or change post"
      >
        <i className="fas fa-cogs" />
        Edit
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

DropdownMenu.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
/*
  ProfileEditDropdownMenu Component
  ----------------------------------
  - Renders a dropdown menu for editing a user's profile and changing their password.

  Props:
  - id: Profile ID used to generate navigation URLs.

  Features:
  - Uses `useNavigate` to navigate to:
    1. Edit Profile: `/profiles/${id}/edit`.
    2. Change Password: `/profiles/${id}/edit/password`.
  - Custom styles applied via `styles.Dropdown`, `styles.DropdownPosition`, and `styles.DropdownItem`.
  - Accessible with `aria-label` attributes.
  - Includes Font Awesome icons for visual context.
*/

export function ProfileEditDropdownMenu({ id }) {
  const navigate = useNavigate();

  return (
    <Dropdown className={styles.Dropdown} drop="left">
      <Dropdown.Toggle as={DropdownSelect} />
      <Dropdown.Menu className={styles.DropdownPosition}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label="edit profile"
        >
          <i className="fas fa-cogs" />
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="change password"
        >
          <i className="fas fa-user-lock" />
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

ProfileEditDropdownMenu.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
