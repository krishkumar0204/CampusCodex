const About = () => {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
          About CampusCodex
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          A focused learning hub for tech students.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          CampusCodex helps students find useful notes, organize resources, and
          build stronger foundations in core computer science subjects. The goal
          is simple: make learning easier to start, easier to continue, and more
          useful for projects, interviews, and college work.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Curated Notes
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse notes across DBMS, DSA, networking, operating systems,
              full-stack development, and AI.
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Student First
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Save useful notes, return to them quickly, and keep your study
              flow organized from one dashboard.
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Built To Grow
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The platform is designed to keep expanding with better resources,
              topics, and community feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
