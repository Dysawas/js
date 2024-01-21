import { createPortal } from "react-dom";
import styles from "./Modal.module.sass";

export default function Modal({ user, close }) {
  return createPortal(
    <div className={styles.modal} onClick={close}>
      <div className={styles["modal-content"]} onClick={e => e.stopPropagation()}>
        <span className={styles.close} onClick={close}>
          &times;
        </span>
        <div>
          <label>ФИО</label>
          <span>{user.lastName + " " + user.firstName}</span>
        </div>
        <div>
          <label>Возраст</label>
          <span>{user.age}</span>
        </div>
        <div>
          <label>Адрес</label>
          <span>{user.address.city + " " + user.address.address}</span>
        </div>
        <div>
          <label>Рост</label>
          <span>{user.height}</span>
        </div>
        <div>
          <label>Вес</label>
          <span>{user.weight}</span>
        </div>
        <div>
          <label>Номер телефона</label>
          <span>{user.phone}</span>
        </div>
        <div>
          <label>email</label>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  , document.getElementById("modal"));
}
