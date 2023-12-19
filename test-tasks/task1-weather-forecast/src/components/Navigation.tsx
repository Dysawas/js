import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return(
        <nav className="bg-amber-200 sticky flex justify-between top-0 px-2 ">
            <Link to="/">На главную</Link>
            <Link to="/weather">Погода по городам</Link>
            <Link to="/profile">Профиль</Link>
            <Link to="/logout">Выйти</Link>
        </nav>
    )
}

export default Navigation