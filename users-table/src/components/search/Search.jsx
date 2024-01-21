import styles from "./Search.module.sass";

export default function Search({ searchText, onChangeSearchText }) {
  return (
    <div className={styles.container}>
      <label className={styles["search-label"]}>Поиск по ФИО</label>
      <input
        className={styles["search-input"]}
        type="text"
        value={searchText}
        onChange={(e) => onChangeSearchText(e.target.value)}
      ></input>
    </div>
  );
}
