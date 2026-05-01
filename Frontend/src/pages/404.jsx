import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-3.75rem)] items-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Page not found
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl lg:text-6xl">
            This route does not exist.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
            The page may have been moved, renamed, or typed incorrectly. Head
            back to the notes library and keep your study flow moving.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/notes"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm transition hover:border-orange-500 hover:text-orange-500"
            >
              <SearchX size={18} />
              Browse Notes
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-700 transition hover:text-orange-500"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full bg-white shadow-lg sm:max-w-md">
            <div className="absolute inset-6 rounded-full border border-slate-200" />
            <div className="absolute inset-14 rounded-full border border-dashed border-orange-300" />
            <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full bg-slate-950 text-white shadow-xl sm:h-56 sm:w-56">
              <span className="text-6xl font-bold text-orange-400 sm:text-7xl">
                404
              </span>
              <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
                Lost route
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
