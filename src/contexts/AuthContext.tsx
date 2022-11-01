import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
} from "react";
import { User } from "../data/User/users";

interface AuthContextType {
  user: User;
  jwt: string;
  isAuth: () => boolean;
  login: (user: User, jwt: string, rember: boolean) => void;
  logout: () => void;
  updateProfile: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User>({} as User);
  const [jwt, setJwt] = useState<string>("");

  const isAuth = () => {
    return Boolean(user.username);
  };

  const login = (user: User, jwt: string, remember: boolean) => {
    setUser(user);
    setJwt(jwt);
  };
  const logout = () => {
    setUser({} as User);
    setJwt("");
  };

  const updateProfile = (newUser: User) => {
    setUser(newUser);
  };

  const memoedValue = useMemo(() => {
    return {
      user,
      jwt,
      login,
      logout,
      updateProfile,
      isAuth,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
