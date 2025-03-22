import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className={styles["error-page"]}>
      <h2>Page not found!</h2>
      <p>You entered an invalid URL!</p>
      <Link to="..">Return</Link>
    </div>
  );
}
