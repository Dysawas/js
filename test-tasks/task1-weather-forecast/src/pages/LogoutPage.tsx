import React, { useEffect } from 'react';

function LogoutPage() {
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isAuth') as string) === true) {
            localStorage['isAuth'] = false
        }
    }, [])

    return (
      <div className="text-center">
       {JSON.parse(localStorage.getItem('isAuth') as string) ? <span>Вы вышли</span> : <span>Вы не залогинились</span>}
      </div>
    );
  }
  
  export default LogoutPage;
  