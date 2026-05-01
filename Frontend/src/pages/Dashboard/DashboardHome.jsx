import { BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <section className="mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        <BookmarkCheck size={28} />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Your dashboard is ready.
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
        Click Saved Notes from the sidebar whenever you want to view the notes
        you saved for later.
      </p>
      <Link
        to="saved"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
      >
        Open Saved Notes
      </Link>
    </section>
  );
};

export default DashboardHome;
