import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Profile Updated");
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://bikkina-erp-production.up.railway.app/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  };

  return (
    <div className="max-w-4xl">

      <h1 className="text-4xl font-bold mb-8 text-white">
        Settings
      </h1>

      <div className="bg-gray-900 p-8 rounded-xl">

        <h2 className="text-2xl font-bold mb-6 text-white">
          User Profile
        </h2>

        <div className="mb-5">
          <label className="block mb-2 text-white font-semibold">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-white font-semibold">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 mb-10">

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg"
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

        <hr className="border-gray-700 mb-8" />

        <h2 className="text-2xl font-bold mb-6 text-white">
          Change Password
        </h2>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}

export default Settings;