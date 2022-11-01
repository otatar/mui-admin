export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  authorizationLevel: string;
  activated: boolean;
}

export const users: User[] = [
  {
    id: 1,
    username: "admin",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    authorizationLevel: "admin",
    activated: true,
  },
  {
    id: 2,
    username: "otatar",
    firstName: "Omer",
    lastName: "Tatar",
    email: "otatar@gmail.com",
    authorizationLevel: "user",
    activated: true,
  },
  {
    id: 3,
    username: "otata1",
    firstName: "Omer1",
    lastName: "Tatar1",
    email: "otatar1@gmail.com",
    authorizationLevel: "user",
    activated: true,
  },
  {
    id: 4,
    username: "otatar2",
    firstName: "Omer2",
    lastName: "Tatar2",
    email: "otatar2@gmail.com",
    authorizationLevel: "user",
    activated: true,
  },
  {
    id: 5,
    username: "otatar3",
    firstName: "Omer3",
    lastName: "Tatar3",
    email: "otatar3@gmail.com",
    authorizationLevel: "user",
    activated: true,
  },
  {
    id: 6,
    username: "admin1",
    firstName: "Admin",
    lastName: "Admin",
    email: "admin.admin@gmail.com",
    authorizationLevel: "admin",
    activated: true,
  },
];
