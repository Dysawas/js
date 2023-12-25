import { observer } from 'mobx-react-lite';
import { IContact } from '../models/contactModel';

interface ContactElTypes {
    id: number,
    name: string,
    phoneNumber: string,
    openDeleteModal: (id: number) => void,
    openUpdateModal: (contact: IContact) => void
}
export const ContactEl = observer(({id, name, phoneNumber, openUpdateModal, openDeleteModal}: ContactElTypes) => {
    return(
        <section className="mb-1 text-lg">
            <div className="m-1">
                <label className="mx-2">Имя:</label>
                <span>{name}</span>
            </div>
            <div className="m-1">
                <label className="mx-2">Номер телефона:</label>
                <span>{phoneNumber}</span>
            </div>
            <div className="m-1">
                <button className="rounded-lg bg-lime-500 px-2 mx-2" onClick={() => openUpdateModal({id, name, phoneNumber})}>Редактировать</button>
                <button className="rounded-lg bg-red-500 px-2" onClick={() => openDeleteModal(id)}>Удалить</button>
            </div>
        </section>
    )
})