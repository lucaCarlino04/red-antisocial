import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { CamposFormulario } from "../types/FormularioRegistro";
import type { ErroresRegistro } from "../types/ErroresRegistro";

export default function RegistroUsuario() {

  const email_regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const name_regex: RegExp = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]{2,}$/;
  const name_min_length: number = 4;
  const nickname_min_length: number = 4;
  const password_min_length: number = 8;
  const password_max_length: number = 32;

  const [errores, setErrores] = useState<Partial<ErroresRegistro>>({
    nombre: "",
    apellido: "",
    nickname: "",
    email: "",
    contraseña: ""
  })

  const [formulario, setFormulario] = useState<CamposFormulario>({
    nombre: "",
    apellido: "",
    nickname: "",
    email: "",
    contraseña: ""
  })

  function completandoRegistro(e: any) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" })
  }

  function enviandoInformacion(e: any) {
    e.preventDefault();
    const erroresActuales: Partial<ErroresRegistro> = {};

    if (formulario.nombre.length < name_min_length) {
      erroresActuales.nombre = "El nombre no es correcto"
    } else if (!name_regex.test(formulario.nombre)) {
      erroresActuales.nombre = "El nombre no tiene formato valido"
    }

    if (formulario.apellido.length <= 0) {
      erroresActuales.apellido = "El apellido es obligatorio"
    } else if (!name_regex.test(formulario.apellido)) {
      erroresActuales.apellido = "El apellido no tiene formato valido"
    }

    if (formulario.nickname.length < nickname_min_length) {
      erroresActuales.nickname = "El nombre de usuario no es valido"
    }

    if (formulario.email.length <= 0) {
      erroresActuales.email = "El Email es obligatorio"
    } else if (!email_regex.test(formulario.email)) {
      erroresActuales.email = "El Email no tiene formato valido"
    }

    if (formulario.contraseña.length < password_min_length || formulario.contraseña.length > password_max_length) {
      erroresActuales.contraseña = "La contraseña no tiene la cantidad de caracteres requeridos"
    }

    setErrores(erroresActuales);

    if (Object.keys(erroresActuales).length > 0) {
      return;
    }
  }

  return (
    <div>
      <div>
        <h1>Registro</h1>
        <p>Completa los campos para continuar:</p>
      </div>

      <form onSubmit={enviandoInformacion}>
        <div>
          <label>
            <span>{errores.nombre ? errores.nombre : "Nombre"}</span>
            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formulario.nombre}
              onChange={completandoRegistro}
            />
          </label>
        </div>
        <div>
          <label>
            <span>{errores.apellido ? errores.apellido : "Apellido"}</span>
            <input
              id="apellido"
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formulario.apellido}
              onChange={completandoRegistro}
            />
          </label>
        </div>
        <div>
          <label>
            <span>{errores.nickname ? errores.nickname : "Nickname"}</span>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Nickname"
              value={formulario.nickname}
              onChange={completandoRegistro}
            />
          </label>
        </div>
        <div>
          <label>
            <span>{errores.email ? errores.email : "Email"}</span>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formulario.email}
              onChange={completandoRegistro}
            />
          </label>
        </div>
        <div>
          <label>
            <span>{errores.contraseña ? errores.contraseña : "Contraseña"}</span>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formulario.contraseña}
              onChange={completandoRegistro}
            />
          </label>
        </div>
        <div>
          <button type="submit">
            Registrarse
          </button>
          <button type="button">
            ¿Ya tenés una cuenta? Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
}
