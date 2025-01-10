import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DropdownMenu.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { TbGridDots } from "react-icons/tb";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const DropdownSelect = React.forwardRef(
  ({ onClick }, ref) => (
    (DropdownSelect.displayName = "DropdownSelect"),
    (
      <i
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        <TbGridDots className={styles.DropdownItem} />
      </i>
    )
  )
);

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="mr-auto" drop="right">
      <Dropdown.Toggle as={DropdownSelect} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="remove post"
          >
            <i className="fas fa-eraser" />
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit or change post"
          >
            <i className="fas fa-cogs" />
          </Dropdown.Item>
        </OverlayTrigger>
      </Dropdown.Menu>
    </Dropdown>
  );
};


export function ProfileEditDropdownMenu({ id }) {
  const navigate = useNavigate();

  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={DropdownSelect} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Edit your profile</Tooltip>}
        >
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit`)} 
            aria-label="edit profile"
            className={styles.DropdownItem}
          >
            <i className="fas fa-cogs" />
          </Dropdown.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Change your password</Tooltip>}
        >
          <Dropdown.Item
            onClick={() => navigate(`/profiles/${id}/edit/password`)}
            aria-label="change password"
            className={styles.DropdownItem}
          >
            <i className="fas fa-user-lock" />
          </Dropdown.Item>
        </OverlayTrigger>
      </Dropdown.Menu>
    </Dropdown>
  );
}
