import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.sass';
import { store } from "../../store/store";
import { useState } from "react";
import { UserLogin } from "../../models/models";


export default function LoginPage() {
    const nav = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = store.authStore

    const onClickLogin = async () => {
        const user: UserLogin = {
            login: userName,
            password: password
        }
        const res: boolean | undefined = await login(user)
        if (res) {
            nav("/main")
            localStorage.setItem("auth", "true")
        }
        else setError("Error")
    }
    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-item"]}>
                {error}
                <form className={styles.form + " " + styles["form-login"]} onSubmit={e => e.preventDefault()}>
                    <div className={styles["form-field"]}>
                        <label className={styles.user} htmlFor="login-username"><span className={styles.hidden}>Имя пользователя</span></label>
                        <input id="login-username" type="text" className={styles["form-input"]} placeholder="Имя пользователя"
                            value={userName} onChange={e => setUserName(e.target.value)} required />
                    </div>

                    <div className={styles["form-field"]}>
                        <label className={styles.lock} htmlFor="login-password"><span className={styles.hidden}>Пароль</span></label>
                        <input id="login-password" type="password" className={styles["form-input"]} placeholder="Пароль"
                            value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className={styles["form-field"]}>
                        <button className={styles["btn-enter"]} onClick={onClickLogin}>Войти</button>
                    </div>
                    <div className={styles["form-field"]}>
                        <button className={styles["btn-registration"]} onClick={() => nav("/registration")}>Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>

    )
}