import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {store} from "../store/store";

export const useNavigateToLogin = (currentPath: string) =>{
    const location = useLocation()
    const navigation = useNavigate()
    
    useEffect(() => {
        if (!store.authStore.isAuth && location.pathname === currentPath) {
          navigation("login")
        }
    }, [currentPath])
}
  