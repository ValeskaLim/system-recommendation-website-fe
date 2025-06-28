import axios from "axios";
import { useState } from "react";
import { ROUTE_PATHS } from "../../router/routePaths";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/auth/validate-user", {
                username, password
            });
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col h-fit w-150 border p-5 rounded-2xl justify-center">
        <h2 className="text-4xl text-center">Login</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-lg">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            ></input>
            <label className="text-lg">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            ></input>
            <a href={ROUTE_PATHS.REGISTER} className="text-blue-400 duration-300 hover:duration:300 hover:text-blue-500">Don't have account? Register here</a>
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
