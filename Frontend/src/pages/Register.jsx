import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { getApiBaseUrl } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = getApiBaseUrl();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${apiBaseUrl}/auth/register`, {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      toast.success("Registration Successfully");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mx-auto w-full max-w-md px-4 mt-10 sm:mt-15 mb-28 flex flex-col items-center">
          <div className="w-full p-5 sm:p-8 shadow-md shadow-neutral-500 rounded-xl">
            <h3 className="font-semibold text-center text-xl mb-5">
              Register
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center">
                {error && (
                  <p className="text-red-500 text-sm mb-2">{error}</p>
                )}
              </div>
              {/* Name  */}
              <div className="mb-3">
                <label for="name">
                  Name<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your name..."
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* username  */}
              <div className="mb-3">
                <label for="username">
                  Username<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your name..."
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email  */}
              <div className="mb-3">
                <label for="email">
                  Email<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="email"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your email..."
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password  */}

              <div className="mb-3">
                <label for="password">
                  Password<span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="password"
                  className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                  placeholder="Enter your password..."
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <Link to="/login" className="text-blue-700 font-semibold">
                  Already have a account ?
                </Link>
              </div>
              <div className="mb-1 mt-4 flex justify-center items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white font-semibold w-full h-9 rounded-sm"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
