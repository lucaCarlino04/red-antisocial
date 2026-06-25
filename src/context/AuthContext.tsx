import { createContext, useContext, useState } from "react";

type Usuario = { id: number; nickName: string };

const AuthContext = createContext<{ usuario: Usuario | null } | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
