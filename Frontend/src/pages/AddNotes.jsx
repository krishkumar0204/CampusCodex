import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getApiBaseUrl } from "../utils/api";

const AddNotes = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const thumbnailRef = useRef();
  const pdfRef = useRef();
  const apiBaseUrl = getApiBaseUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!thumbnail || !pdf) {
      return toast.error("Thumbnail and PDF are required");
    }
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("thumbnail", thumbnail);
    data.append("pdf", pdf);

    try {
      setLoading(true);
      await axios.post(`${apiBaseUrl}/notes`, data, {
        withCredentials: true,
      });
      toast.success("Note Added Successfully");
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mx-auto w-full max-w-md px-4 mt-10 sm:mt-15 mb-28 flex flex-col items-center">
            <div className="w-full p-5 sm:p-8 shadow-md shadow-neutral-500 rounded-xl">
              <h3 className="font-semibold text-center text-xl mb-5">
                Add Notes
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-center">
                  {error && (
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                  )}
                </div>
                <div className="mb-1">
                  {/* title  */}
                  <label htmlFor="title">
                    Title
                    <span className="text-red-600">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    className="w-full h-9 mt-2 pl-3 border-2 border-neutral-300 rounded-sm hover:border-green-300 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                {/* description  */}
                <div className="mb-1">
                  <label htmlFor="description">
                    Description<span className="text-red-600">*</span>
                  </label>
                  <br />
                  <textarea
                    type="text"
                    value={form.description}
                    name="description"
                    placeholder="Description"
                    className="w-full h-20 mt-2 p-3 border-2 border-neutral-300 rounded-sm hover:border-green-200 transition duration-200 ease focus:outline-0 focus:border-sky-300"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                {/* Thumbnail  */}
                <div className="mb-1">
                  <label htmlFor="thumbnail">
                    Thumbnail <span className="text-red-500">*</span>
                  </label>

                  {/* Hidden input  */}
                  <input
                    type="file"
                    name="thumbnail"
                    ref={thumbnailRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file || !file.type.startsWith("image/")) {
                        return toast.error("Please upload a valid image");
                      }
                      setThumbnail(file);
                    }}
                  />

                  {/* Custom UI  */}

                  <div
                    onClick={() => thumbnailRef.current.click()}
                    className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 duration-200"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-gray-500">
                      <Upload />
                      <span className="truncate">
                        {thumbnail ? thumbnail.name : "Click to upload image"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">PNG, JPG</span>
                  </div>
                </div>

                {/* Notes pdf  */}
                <div className="mb-3">
                  <label htmlFor="pdf">
                    Pdf <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="file"
                    name="pdf"
                    ref={pdfRef}
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (!file || file.type !== "application/pdf") {
                        return toast.error("Only PDF allowed");
                      }
                      setPdf(file);
                    }}
                  />
                  <div
                    onClick={() => pdfRef.current.click()}
                    className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-green-400 duration-200"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-gray-400">
                      <Upload />
                      <span className="truncate">
                        {pdf ? pdf.name : "Click to upload pdf"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">PDF</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  {" "}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white font-semibold w-full h-9 rounded-sm"
                  >
                    {loading ? "Uploading..." : "Upload Notes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddNotes;
