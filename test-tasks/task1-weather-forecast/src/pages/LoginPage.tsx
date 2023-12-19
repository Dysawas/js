import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  
  const navigate = useNavigate();

  const onClickEnter = (event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
    if(login === "Admin" && password === "12345") {
      localStorage['isAuth'] = 'true'
      navigate("/profile")
      setError(false)
    } else {
      setError(true)
    }
  }
    return (
      <form className="p-1 m-1 flex flex-wrap">
        <div className="m-2">
          <label className="m-2">Логин</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)}></input>
        </div>
      <div className="m-2">  
        <label className="m-2">Пароль</label>
        <input className="right-0" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
       </div>
       <button className="bg-emerald-500 rounded-full min-w-min w-16" onClick={onClickEnter}>Войти</button>
       {error && <p>“Имя пользователя или пароль введены не верно”</p>}
      </form>
    );
  }
  
  export default LoginPage;
  