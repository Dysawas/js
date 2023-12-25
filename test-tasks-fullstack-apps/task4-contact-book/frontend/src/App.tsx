import React, { useEffect, useState } from 'react';
import { IContact } from './models/contactModel';
import { observer } from 'mobx-react-lite';
import ContactStore from "./store/store"
import { ContactEl } from './components/ContactEl';
import { ContactForm } from './components/ContactForm';
import { Modal } from './components/Modal';

const App = observer(() => {

  const { addContact, updateContact, removeContact, fetchContacts, reverseContacts } = ContactStore

  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [btnActionText, setBtnActionText] = useState("");

  useEffect(() => {
    fetchContacts()
  }, [])

  const openAddModal = () => {
    setModalAdd(prev => !prev)
    setBtnActionText("Добавить")
  }

  const onClickBtnAdd = async () => {
    const contact: IContact = {
      id: 0, name, phoneNumber
    }
    await addContact(contact)
    setModalAdd(prev => !prev)
    setName("")
    setPhoneNumber("")
  }

  const openUpdateModal = (contact: IContact) => {
    setId(contact.id)
    setName(contact.name)
    setPhoneNumber(contact.phoneNumber)
    setModalUpdate(prev => !prev)
    setBtnActionText("Сохранить")
  }

  const onClickBtnUpdate = async () => {
    await updateContact(id, {id, name, phoneNumber}) 
    setModalUpdate(prev => !prev)
    setId(0)
    setName("")
    setPhoneNumber("")
  }

  const openDeleteModal = (id: number) => {
    setModalDelete(prev => !prev)
    setBtnActionText("Удалить")
    setId(id)
  }

  const onClickBtnDelete = async () => {
    await removeContact(id)
    setModalDelete(prev => !prev)
    setId(0)
  }

  return (
    <div className="App">
      <main>
        <Modal btnActionText={btnActionText} title={"Добавление контакта"} action={onClickBtnAdd} show={modalAdd} onClose={() => setModalAdd(prev => !prev)} > 
          <ContactForm
            name={name}
            phoneNumber={phoneNumber}
            onChangeName={(event) => setName(event.target.value)}
            onChangePhoneNumber={(event) => setPhoneNumber(event.target.value)}
            />
          </Modal>

          <Modal btnActionText={btnActionText} title={"Редактирование контакта"} action={onClickBtnUpdate} show={modalUpdate} onClose={() => setModalUpdate(prev => !prev)} > 
            <ContactForm
              name={name}
              phoneNumber={phoneNumber}
              onChangeName={(event) => setName(event.target.value)}
              onChangePhoneNumber={(event) => setPhoneNumber(event.target.value)}
            />
          </Modal>

          <Modal action={onClickBtnDelete} show={modalDelete} onClose={() => setModalDelete(prev => !prev)} title="Удаление контакта" btnActionText={btnActionText} />

        <button className="rounded-lg bg-blue-500 px-2 mx-1" onClick={openAddModal}>Добавить контакт</button>
        {reverseContacts.map(c => <ContactEl key={c.id} {...c} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />)}
      </main>
    </div>
  );
})

export default App;
