import { users, User } from "./users";

let Users = [...users];

export const getUser = (username: string): Promise<User> => {
  const user = Users.filter((u: User) => u.username === username)[0];
  return new Promise((resolve, reject) => {
    if (user) {
      return resolve(user);
    } else {
      reject();
    }
  });
};

export const getUserByID = (id: number): Promise<User> => {
  const user = Users.filter((u: User) => u.id === id)[0];
  return new Promise((resolve, reject) => {
    if (user) {
      return resolve(user);
    } else {
      reject();
    }
  });
};

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve: (value: User[]) => void) => {
    resolve(Users);
  });
};

export const addUser = (newUser: User): void => {
  Users = [...Users, newUser];
};

export const updateUser = (newUser: User): void => {
  Users = Users.map((u: User) => (u.id === newUser.id ? newUser : u));
};

export const deleteUser = (id: number): void => {
  Users = Users.filter((u: User) => u.id != id);
};

export const genereateUserId = (): number => {
  const sorted = [...Users].sort((a, b) => b.id - a.id);
  return sorted[0].id + 1;
};
