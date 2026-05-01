import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Login Successfully");
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login Failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto w-full max-w-md px-4 mt-16 sm:mt-20 mb-28 flex flex-col items-center">
          <div className="w-full p-5 sm:p-8 shadow-md shadow-neutral-500 rounded-xl">
            <h3 className="font-semibold text-center text-xl mb-5">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center">
                {error && (
                  <p className="text-red-500 text-sm mb-2">{error}</p>
                )}
              </div>

              {/* username  */}
              <div className="mb-3">
                <label htmlFor="username">
                  Username<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your name..."
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password  */}

              <div className="mb-3">
                <label htmlFor="password">
                  Password<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="password"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your password..."
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 mt-2 text-center">
                <p className="font-medium text-neutral-700">
                  Don't have an account?
                </p>

                <Link to="/register" className="text-blue-700 font-semibold">
                  Create One
                </Link>
              </div>
              <div className="mb-1 mt-4 flex justify-center items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white font-semibold w-full h-9 rounded-sm"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
