export interface User {
    id: number
    login: string
    email: string
}

export interface UserCreate {
    login: string
    password: string
    email: string
}

export interface UserLogin {
    login: string
    password: string
}

//Image model
export interface Image {
    id: number
    title: string
    content: string,
    extension: string,
    userId: number
}

export interface ImageCreate {
    title: string
    content: string,
    extension: string,
    userId: number
}