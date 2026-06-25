import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-2 py-4 border-b border-zinc-300 dark:border-gray-800">
      <img src={logo} alt="logo" className="w-7 h-7" />
      <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white uppercase">
        antisocial-unahur
      </h1>
    </header>
  );
}
