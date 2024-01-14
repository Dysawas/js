import { makeAutoObservable } from "mobx"
import {AuthStore, authStore} from "./authStore"
import { ImageStore, imageStore } from "./imageStore"

class RootStore {
    authStore: AuthStore
    imageStore: ImageStore
    constructor(authStore: AuthStore, imageStore: ImageStore){
        makeAutoObservable(this)
        this.authStore = authStore
        this.imageStore = imageStore
    }
}

export const store = new RootStore(authStore, imageStore)