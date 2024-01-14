import { useEffect } from 'react';
import { store } from '../../store/store';
import styles from './UsersPage.module.sass';
import { observer } from 'mobx-react-lite';
import { useNavigateToLogin } from '../../hooks/hooks';


export const UsersPage = observer(() => {
    const { getAllUsers, users } = store.authStore


    useEffect(() => {
        getAllUsers()
    }, [])
    
    useNavigateToLogin("/users")

    return (
        <div>
            {users.map(u => <p key={u.id}>{u.login}</p>)}
        </div>
    )
})