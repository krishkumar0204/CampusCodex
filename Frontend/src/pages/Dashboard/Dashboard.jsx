import { BookmarkCheck, LogOut } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      toast.success("Logged out successfully");
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100vh-3.75rem)] bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6">
        <aside className="w-full rounded-md bg-slate-950 p-4 text-white shadow-lg md:flex md:min-h-[calc(100vh-6.75rem)] md:w-64 md:flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 md:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                Account
              </p>
              <h1 className="mt-1 text-xl font-bold">Dashboard</h1>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 md:hidden"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <nav className="mt-4 space-y-2">
          <NavLink
            to="saved"
            className={({ isActive }) =>
              [
                "flex items-center gap-2 rounded-md px-3 py-2 font-semibold duration-300 ease",
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-slate-200 hover:bg-white/10 hover:text-orange-300",
              ].join(" ")
            }
          >
            <BookmarkCheck size={18} />
            Saved Notes
          </NavLink>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto hidden w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2 font-semibold text-slate-100 hover:border-orange-500 hover:text-orange-300 md:flex"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
