import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Usuario } from "../types/Usuario";

import UsuarioPerfil from "../components/UsuarioPerfil";

export default function Perfil() {
  const {nickName} = useParams<{ nickName: string }>();
  return <div>
    <UsuarioPerfil nickName={nickName ?? ""}></UsuarioPerfil>
  </div>;
}
