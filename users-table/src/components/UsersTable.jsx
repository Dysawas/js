import { useEffect, useState } from "react";
import styles from "./UsersTable.module.sass";
import Search from "./search/Search";
import Modal from "./modal/Modal";
import { getAllUsers, searchUsers } from "../actions/actions";
import TableHead from "./table/TableHead";
import TableBody from "./table/TableBody";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [load, setLoad] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const [error, setError] = useState("");
  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoad(false);
      }
    };
    fetchData();
  }, []);

  //search

  function onChangeSearchText(value) {
    setSearchText(value);
    setTimeout(async () => {
      try {
        const users = await searchUsers(value);
        setUsers(users);
      } catch (error) {
        setError(error.message);
      }
    }, 500);
  }

  //Sort

  function sortUsers(direction, sortByType) {
    let sortedUsers = [];

    switch (sortByType) {
      case "ФИО":
        if (direction === "ascending")
          sortedUsers = users.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          );
        else
          sortedUsers = users.sort((a, b) =>
            b.lastName.localeCompare(a.lastName)
          );
        setUsers([...sortedUsers]);
        break;
      case "Возраст":
        if (direction === "ascending")
          sortedUsers = users.sort((a, b) => a.age - b.age);
        else sortedUsers = users.sort((a, b) => b.age - a.age);
        setUsers([...sortedUsers]);
        break;
      case "Пол":
        if (direction === "ascending")
          sortedUsers = users.sort((a, b) => a.gender.localeCompare(b.gender));
        else
          sortedUsers = users.sort((a, b) => b.gender.localeCompare(a.gender));
        setUsers([...sortedUsers]);
        break;
      case "Адрес":
        if (direction === "ascending")
          sortedUsers = users.sort((a, b) =>
            a.address.city.localeCompare(b.address.city)
          );
        else
          sortedUsers = users.sort((a, b) =>
            b.address.city.localeCompare(a.address.city)
          );
        setUsers([...sortedUsers]);
        break;
      default:
        break;
    }
  }

  function resetSortUsers() {
    setUsers([...users.sort((a, b) => a.id - b.id)]);
  }

  //modal

  function openModal(user) {
    setUser(user);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {load ? (
        <span style={{ color: "white" }}>loading...</span>
      ) : error ? (
        <p className={styles.error}>{error + " перезагрузите страницу"}</p>
      ) : (
        <>
          <Search
            searchText={searchText}
            onChangeSearchText={onChangeSearchText}
          ></Search>
          {users.length === 0 ? (
            <p style={{ color: "white" }}>Пользователи не найдены...</p>
          ) : (
            <table>
              {
                <TableHead
                  sortUsers={sortUsers}
                  resetSortUsers={resetSortUsers}
                />
              }
              <TableBody users={users} openModal={openModal} />
            </table>
          )}
          {isOpen && <Modal user={user} close={closeModal}></Modal>}
        </>
      )}
    </>
  );
}
