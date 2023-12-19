import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(JSON.parse(localStorage.getItem('isAuth') as string))
  useEffect(() => {
    if (isAuth === false || isAuth === null) {
      navigate("/login")
    }
  }, [navigate])

  return (
    (isAuth && <div className="flex flex-wrap justify-center m-2">
      <div>
        <h1 className="text-center font-semibold text-lg">Профиль</h1>
        <span>Lorem ipsum dolor sit amet.</span>
      </div>
      <div>
        <h2 className="text-center font-semibold text-lg">Обо мне</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eum harum assumenda animi reprehenderit consequuntur totam temporibus rem consequatur, minima quibusdam amet deleniti velit,
          dolorum cumque ea voluptate? Nulla, adipisci omnis.
        </p>
      </div>
      <div>
        <h2 className="text-center font-semibold text-lg">Детали</h2>
        <div>
          <label className="mr-1">Имя:</label>
          <span>name</span>
        </div>
        <div>
          <label className="mr-1">Возраст:</label>
          <span>age</span>
        </div>
      </div>
    </div>)
  );
}

export default ProfilePage;
