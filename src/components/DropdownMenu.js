import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { TbGridDots } from "react-icons/tb";
import styles from "../styles/DropdownMenu.module.css";


const DropdownSelect = React.forwardRef(({ onClick }, ref) => (
  (DropdownSelect.displayName = "DropdownSelect")
  (
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
  )
));

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
