import { useState, useEffect } from "react";
import axios from "axios";
import NotesCard from "../components/NotesCard";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { getApiBaseUrl } from "../utils/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveIds, setSaveIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        let url = `${apiBaseUrl}/notes`;
        if (debouncedSearch.trim() !== "") {
          url = `${apiBaseUrl}/notes/search?query=${encodeURIComponent(
            debouncedSearch,
          )}`;
        }
        const res = await axios.get(url);
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes ", err);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [apiBaseUrl, debouncedSearch]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/user/saved-notes`, {
          withCredentials: true,
        });

        const ids = res.data.map((note) => note._id);
        setSaveIds(ids);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSaved();
  }, [apiBaseUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSave = async (id) => {
    try {
      const res = await axios.post(
        `${apiBaseUrl}/notes/save/${id}`,
        {},
        { withCredentials: true },
      );
      if (res.data.saved) {
        setSaveIds((prev) => [...prev, id]);
      } else {
        setSaveIds((prev) => prev.filter((x) => x !== id));
      }

      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-md items-center justify-center">
            <input
              type="search"
              placeholder="Search notes by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6 block w-full rounded-md border-2 border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-20 mt-8 md:mt-15 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NotesCard
                  key={note._id}
                  {...note}
                  onSave={handleSave}
                  isSaved={saveIds.includes(note._id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                {debouncedSearch
                  ? `No notes found for "${debouncedSearch}"`
                  : "No notes found"}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Notes;
