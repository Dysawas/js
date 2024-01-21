

export default function TableBody({users, openModal}) {
    function usersToTableRows(user) {
        return (
          <tr key={user.id} onClick={(e) => openModal(user)}>
            <td>{user.lastName + " " + user.firstName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.address.city + " " + user.address.address}</td>
          </tr>
        );
    }
    return(
        <tbody>{users.map(usersToTableRows)}</tbody>
    )
}