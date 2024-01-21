import Sort from "../sort/Sort";

export default function TableHead({ sortUsers, resetSortUsers }) {
  return (
    <thead>
      <tr>
        <th scope="col">
          <Sort
            sortByType="ФИО"
            sortUsers={sortUsers}
            resetUsers={resetSortUsers}
          ></Sort>
          ФИО
        </th>
        <th scope="col">
          <Sort
            sortByType="Возраст"
            sortUsers={sortUsers}
            resetUsers={resetSortUsers}
          ></Sort>
          Возраст
        </th>
        <th scope="col">
          <Sort
            sortByType="Пол"
            sortUsers={sortUsers}
            resetUsers={resetSortUsers}
          ></Sort>
          Пол
        </th>
        <th scope="col">Номер телефона</th>
        <th scope="col">
          <Sort
            sortByType="Адрес"
            sortUsers={sortUsers}
            resetUsers={resetSortUsers}
          ></Sort>
          Адрес
        </th>
      </tr>
    </thead>
  );
}
