import styles from "./AddNewButton.module.css";

const AddNewButton = ({ children }) => (
  <button title="add" className={styles["add-new-button"]}>
    {children}
  </button>
);

export { AddNewButton };
