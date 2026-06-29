import { createContext, useContext, useState } from "react";
import type { AuthContextType, LoginData, User } from "../types/loginDatos";

<<<<<<< HEAD
type Usuario = { id: string; nickName: string };
=======
const AuthContext = createContext<AuthContextType | undefined>(undefined);
>>>>>>> login

const permitido = {
  id: 1,
  name: "Harry",
  email: "harryKane@gmail.com",
  password: "1234",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

<<<<<<< HEAD
  //Simular que si hay usuario
  const [usuario] = useState<Usuario | null>({
    id: "6a3f235eabc360ebd10b6ad5",
    nickName: "test",
  });
=======
  function iniciar(data: LoginData): boolean {
    if (data.email === permitido.email && data.password === permitido.password) {
      const loggedUser: User = {
        id: permitido.id,
        name: permitido.name,
        email: permitido.email,
      };
>>>>>>> login

      setUser(loggedUser);
      return true;
    }

    return false;
  }

  function salir() {
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    iniciar,
    salir,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}
