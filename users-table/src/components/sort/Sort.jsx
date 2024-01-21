import styles from "./Sort.module.sass";

export default function Sort({ sortUsers, sortByType, resetUsers }) {
  return (
    <div className={styles.container}>
      <button onClick={(e) => sortUsers("ascending", sortByType)}>{"▲"}</button>
      <button onClick={(e) => sortUsers("descending", sortByType)}>{"▼"}</button>
      <button onClick={resetUsers}>Reset</button>
    </div>
  );
}
