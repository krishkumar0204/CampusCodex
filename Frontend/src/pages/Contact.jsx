import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    try {
      setLoading(true);
      setStatus("");
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("");
      toast.success("Message sent successfully");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Message failed to send");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Share feedback, topics, or project ideas.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            CampusCodex is shaped around student needs. Use this page as the
            place for suggestions, missing notes, issue reports, and ideas that
            can make the platform more useful.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Support:</span>{" "}
              krishkumar6984@gmail.com
            </p>
            <p>
              <span className="font-semibold text-slate-900">Topics:</span>{" "}
              notes, resources, dashboard, saved notes, and account help
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-md border border-slate-200 bg-slate-50 p-5 shadow-sm"
        >
          <label className="block text-sm font-semibold text-slate-800">
            Name
            <input
              type="text"
              name="from_name"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
              placeholder="Your name"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-800">
            Email
            <input
              type="email"
              name="from_email"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
              placeholder="you@example.com"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-800">
            Message
            <textarea
              name="message"
              className="mt-2 min-h-32 w-full resize-y rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-orange-500"
              placeholder="Tell us what you need"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-md bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status === "error" && (
            <p className="mt-3 text-sm font-medium text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
