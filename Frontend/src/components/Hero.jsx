import { Link } from "react-router-dom";
import Card from "./Card";
import BulkCoders from "../assets/Bulk_coders.png";
import DarkBooks from "../assets/Dark_Books_.png";

const Hero = (props) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="min-h-[calc(100vh-3.75rem)] bg-cover bg-center flex items-center justify-center px-4 py-16"
        style={{ backgroundImage: `url(${BulkCoders})` }}
      >
        <div className="w-full max-w-2xl bg-black/55 p-5 sm:p-8 rounded-xl text-center text-white shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Learn. Build. <span className="text-orange-300">Grow in Tech</span>
          </h1>
          <p className="mb-6 text-sm sm:text-base">
            Resources, coding practice, and community for tech students
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/notes"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-2 font-semibold transition-colors duration-300 hover:bg-orange-600 sm:px-6"
            >
              Get Started
            </Link>
            <Link
              to="/notes"
              className="inline-flex items-center justify-center rounded-md border border-white/70 px-5 py-2 font-semibold transition-all duration-300 hover:bg-white hover:text-slate-900 sm:px-6"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${DarkBooks})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95" />
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-orange-400/30 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-white">
          <div className="text-center mb-12">
            <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide uppercase">
              Feature Stack
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              A sharper learning path for Students
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-slate-200/90">
              Pick a subject, follow curated resources, and turn concepts into
              projects that stand out in interviews and internships.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/10 p-4 sm:p-8 backdrop-blur-xl shadow-[0_30px_120px_-40px_rgba(59,130,246,0.8)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch gap-5 sm:gap-8">
              {props.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-2xl bg-white/95 p-1 shadow-lg"
                >
                  <Card
                    title={subject.title}
                    des={subject.desc}
                    image={subject.image}
                  />
                </div>
              ))}
            </div>
            {props.subjects.length === 0 && (
              <p className="text-center text-slate-200 py-6">
                Add subjects to showcase feature cards here.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
