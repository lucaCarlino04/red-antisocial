export default function InicioSesion() {
  return <>
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Título */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
          <p className="mt-2">
            Ingresa tus credenciales para continuar.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full border rounded-md py-2"
          >
            Ingresar
          </button>

        </form>

        {/* Registro */}
        <div className="mt-6 text-center">
          <p>
            ¿No tienes una cuenta?
          </p>

          <button className="mt-2 underline">
            Registrarse
          </button>
        </div>

      </div>
    </div>
  </>;
}
