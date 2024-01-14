import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import LoginPage from "../pages/authorization/LoginPage"
import RegistrationPage from "../pages/authorization/RegistrationPage"
import {ProfilePage} from "../pages/profile/ProfilePage"
import {UsersPage} from "../pages/users/UsersPage"
import {MainPage} from "../pages/main/MainPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "registration",
                element: <RegistrationPage/>
            },
            {
                path: "profile",
                element: <ProfilePage/>
            },
            {
                path: "users",
                element: <UsersPage/>
            },
            {
                path: "main",
                element: <MainPage/>
            }

        ]
    },
  
])

export default router