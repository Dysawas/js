import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import styles from './RegistrationPage.module.sass';
import { store } from '../../store/store';
import { UserCreate } from '../../models/models';

export default function RegistrationPage() {
    const { registration } = store.authStore

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onclickRegister = async (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (password !== confirmPassword) return

        const user: UserCreate = {
            login: userName,
            password: password,
            email: email
        }
        await registration(user)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.content}>
                <form onSubmit={e => e.preventDefault()}>
                    <div className={styles["user-details"]}>
                        <div className={styles["input-box"]}>
                            <span className={styles.details}>Имя пользователя</span>
                            <input type="text" placeholder="Введите ваше имя пользователя"
                                value={userName} onChange={e => setUserName(e.target.value)} required />
                        </div>
                        <div className={styles["input-box"]}>
                            <span className={styles.details}>Email</span>
                            <input type="email" placeholder="Введите ваш email"
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className={styles["input-box"]}>
                            <span className={styles.details}>Пароль</span>
                            <input type="text" placeholder="Введите ваш пароль"
                                value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className={styles["input-box"]}>
                            <span className={styles.details}>Подтверждение пароля</span>
                            <input type="text" placeholder="Подтвердите ваш пароль"
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <input type="submit" value="Зарегистрироваться" onClick={onclickRegister} />
                    </div>
                </form>
            </div>
        </div>
    )
}