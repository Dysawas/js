import { observer } from "mobx-react-lite"
import { useState } from "react"

interface ContactFormTypes {
    name: string,
    phoneNumber: string
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onChangePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ContactForm = observer(({name, phoneNumber, onChangeName, onChangePhoneNumber}: ContactFormTypes) => {

    return (
        <form onSubmit={e => e.preventDefault()} className="text-lg">
            <div className="flex flex-wrap mb-3">
                <label className="font-medium mx-2 basis-1/4">Имя</label>
                <input className="form-input basis-8/12" onChange={onChangeName} value={name} placeholder="Введите имя"></input>
            </div>
            <div className="flex flex-wrap mb-3">
                <label className="mx-2 font-medium basis-1/4">Номер телефона</label>
                <input className="form-input basis-8/12	" onChange={onChangePhoneNumber} value={phoneNumber} placeholder="Введите телефон"></input>
            </div>
        </form>
    )
})