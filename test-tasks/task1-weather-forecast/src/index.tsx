import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "weather",
        element: <WeatherPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "profile",
        element: <ProfilePage/>
      },
      {
        path: "logout",
        element: <LogoutPage/>
      }
    ]
  },
 

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);
