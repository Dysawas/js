export const getAllUsers = async () => {
  const res = await fetch("https://dummyjson.com/users");
  if (res.ok) {
    const json = await res.json();
    return json.users;
  } else throw new Error(res.status + " " + res.statusText);
};

export const searchUsers = async (searchText) => {
  const res = await fetch(`https://dummyjson.com/users/search?q=${searchText}`);
  if (res.ok) {
    const json = await res.json();
    return json.users;
  } else throw new Error(res.status + " " + res.statusText);
};
