import { useState } from "react";
import { ROUTE_PATHS } from "../../router/routePaths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { useToast } from "../../hooks/useToast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorToast, successToast } = useToast();

  const { login, refreshUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email.toLowerCase(), password);
      await refreshUser();
      navigate(ROUTE_PATHS.HOME);
      successToast("Success logged in!");
    } catch (error) {
      console.log(error);
      errorToast("Invalid email or password");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col h-fit w-150 border p-5 rounded-2xl justify-center">
        <h2 className="text-4xl text-center">Login</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lowercase p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            ></input>
            <label className="text-lg">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            ></input>
            <a
              href={ROUTE_PATHS.REGISTER}
              className="text-blue-400 duration-300 hover:duration:300 hover:text-blue-500"
            >
              Don't have account? Register here
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-12 p-2 rounded-md duration-300 hover:bg-blue-600 hover:duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
