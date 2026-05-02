import { useEffect, useState } from "react";
import axios from "axios";
import NotesCard from "../../components/NotesCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getApiBaseUrl } from "../../utils/api";

const SaveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/user/saved-notes`, {
          withCredentials: true,
        });

        setNotes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, [apiBaseUrl]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-0 sm:px-6 py-6 md:mt-10">
        {notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <NotesCard key={note._id} {...note} isSaved />
            ))}
          </>
        ) : (
          <>
            <p className="text-center text-gray-500">No Saved Notes</p>
          </>
        )}
      </div>
    </>
  );
};

export default SaveNotes;
