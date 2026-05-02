import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddNotes from "./pages/AddNotes";
import Footer from "./components/Footer";
import Notes from "./pages/Notes";
import SaveNotes from "./pages/Dashboard/SaveNotes";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/404";
import LoadingSpinner from "./components/LoadingSpinner";
import { getApiBaseUrl } from "./utils/api";

function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/auth/me`, {
          withCredentials: true,
        });
        setIsAllowed(Boolean(res.data.isAuth));
      } catch (err) {
        console.error(err);
        setIsAllowed(false);
      }
    };

    checkAuth();
  }, []);

  if (isAllowed === null) {
    return <LoadingSpinner />;
  }

  return isAllowed ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route
            path="/addnotes"
            element={
              <ProtectedRoute>
                <AddNotes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="saved" element={<SaveNotes />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
