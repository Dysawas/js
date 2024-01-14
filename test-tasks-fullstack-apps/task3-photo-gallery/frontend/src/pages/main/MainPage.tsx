import styles from "./MainPage.module.sass"
import { store } from "../../store/store"
import { useEffect } from "react"
import { Image } from '../../models/models';
import { useNavigateToLogin } from "../../hooks/hooks";
import { observer } from "mobx-react-lite";


export const MainPage = observer(() => {
  const {images, getAllImages} = store.imageStore
  
  useEffect(() => {
    getAllImages()
  }, [])

  useNavigateToLogin("/main")

  const toImg = (i: Image) => {
    return <div>
      <img src={i.content}></img>
      <p>{store.authStore.users.find(u => u.id === i.userId)?.login}</p>
    </div>
  }
    return(
        <>
            {images.map(toImg)}
        </>
        
    )
})

