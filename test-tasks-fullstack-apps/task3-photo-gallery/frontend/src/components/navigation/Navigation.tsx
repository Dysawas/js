import { Link } from 'react-router-dom';
import styles from './Navigation.module.sass';

export default function Navigation() {

  return (
    <>
      <h1 className={styles.logo}><Link to="/main">Главная</Link></h1>
      <nav className={styles["main-nav"]}>
        <Link to="/login">Войти</Link>
        <Link to="/users">Пользователи</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/registration">Регистрация</Link>
      </nav>
    </>

  )
}