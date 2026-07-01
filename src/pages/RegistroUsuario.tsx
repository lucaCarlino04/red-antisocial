import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { crearUsuario } from "../services/UsuarioService";
import type { CamposFormulario } from "../types/FormularioRegistro";
import type { ErroresRegistro } from "../types/ErroresRegistro";

export default function RegistroUsuario() {

  const navigate = useNavigate();

  const { iniciar } = useAuth();

  const email_regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const nickname_min_length: number = 4;
  const passCorrect: string = "12345678";

  const [errorServidor, setErrorServidor] = useState<string>("");

  const [errores, setErrores] = useState<Partial<ErroresRegistro>>({
    nickname: "",
    email: "",
    contraseña: ""
  })

  const [formulario, setFormulario] = useState<CamposFormulario>({
    nickname: "",
    email: "",
    contraseña: ""
  })

  function completandoRegistro(e: any) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" })
  }

  async function enviandoInformacion(e: any) {
    e.preventDefault();
    const erroresActuales: Partial<ErroresRegistro> = {};

    if (formulario.nickname.length < nickname_min_length) {
      erroresActuales.nickname = "El nombre de usuario no es valido"
    }

    if (formulario.email.length <= 0) {
      erroresActuales.email = "El Email es obligatorio"
    } else if (!email_regex.test(formulario.email)) {
      erroresActuales.email = "El Email no tiene formato valido"
    }

    if (formulario.contraseña !== passCorrect) {
      erroresActuales.contraseña = "La contraseña es no es valida"
    }

    setErrores(erroresActuales);

    if (Object.keys(erroresActuales).length > 0) {
      return;
    }

    try {
      await crearUsuario(formulario.nickname, formulario.contraseña, formulario.email);
      await iniciar({ nickName: formulario.nickname, password: formulario.contraseña });
      navigate(`/perfil/${formulario.nickname}`)
    } catch (err) {
      setErrorServidor(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p className="mt-2">Completa los campos para continuar:</p>
        </div>

        {errorServidor && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md px-4 py-3 mb-4">
            {errorServidor}
          </div>)
        }

        <form onSubmit={enviandoInformacion} className="space-y-6">
          <label className="flex flex-col gap-1">
            <span>Usuario</span>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder={errores.nickname ? errores.nickname : "Usuario"}
              className={`w-full  rounded-md p-2 ${errores.nickname ? "border border-2 border-red-300 focus:ring-1 focus:ring-red-300 outline-none" : "border border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={formulario.nickname}
              onChange={completandoRegistro}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Email</span>
            <input
              id="email"
              type="email"
              name="email"
              placeholder={errores.email ? errores.email : "Email"}
              className={`w-full  rounded-md p-2 ${errores.email ? "border border-2 border-red-300 focus:ring-1 focus:ring-red-300 outline-none" : "border border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={formulario.email}
              onChange={completandoRegistro}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Contraseña</span>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              placeholder={errores.contraseña ? errores.contraseña : "Contraseña"}
              className={`w-full  rounded-md p-2 ${errores.contraseña ? "border border-2 border-red-300 focus:ring-1 focus:ring-red-300 outline-none" : "border border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"}`}
              value={formulario.contraseña}
              onChange={completandoRegistro}
            />
          </label>
          <button type="submit" className="
            w-full
            mt-2
            py-3
            rounded-md
            bg-emerald-700 text-white hover:bg-emerald-800 transition
            font-semibold
            active:bg-bg-emerald-300
            active:scale-95">
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>¿Ya tenes una cuenta?</p>
          <button type="button" className="
            w-full
            mt-3
            py-3
            rounded-md
            font-semibold
            active:bg-emerald-800
            bg-emerald-700 text-white hover:bg-emerald-800 transition
            active:scale-95"
            onClick={() => navigate("/iniciar")}>
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}
