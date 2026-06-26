import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://bikkina-erp-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();
if (data.success) {
  localStorage.setItem(
    "token",
    data.token
  );
  localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

  alert("Login Successful");

  navigate("/dashboard");
}
      
       else {
        alert(data.message);
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded"
        >
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;