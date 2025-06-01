import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginImage from "../assets/logistics-animate.svg";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "admin@teste.com" && password === "123456") {
      navigate("/transactions");
    } else {
      setError("Email ou senha inválidos.");
    }
  }

  return (
    <main className="w-full h-screen flex">
      {/* Lado esquerdo */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-full flex flex-col justify-center items-center text-white gap-4 px-8">
        <img
          src={LoginImage}
          alt="Imagem ilustrativa de login"
          className="w-[350px]"
        />
        <h1 className="text-3xl font-bold">Secure Login Portal</h1>
        <p className="text-center text-white/90">
          Access your dashboard securely with our protected login <br /> system.
          Your data is encrypted and secure.
        </p>
      </div>

      {/* Lado direito */}
      <div className="bg-white w-1/2 h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-8 py-10 bg-white rounded shadow-md"
        >
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500">
              Enter your details to sign in to your account
            </p>
          </header>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Botão padrão sem o componente externo */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
