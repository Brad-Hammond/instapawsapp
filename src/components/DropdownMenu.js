import React from "react";
import styles from "../styles/DropdownMenu.module.css";
import { TbGridDots } from "react-icons/tb";

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

export default DropdownSelect;
