const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-900 px-6 py-12 text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">CampusCodex</h2>
          <p>
            A Platform for tech students to learn, practice, grow and gain
            knowledge.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Start Learning</h3>
          <ul className="space-y-2">
            <li className="text-neutral-500 hover:text-orange-500">DBMS</li>
            <li className="text-neutral-500 hover:text-orange-500">DSA</li>
            <li className="text-neutral-500 hover:text-orange-500">
              Web Development
            </li>
            <li className="text-neutral-500 hover:text-orange-500">AI</li>
            <li className="text-neutral-500 hover:text-orange-500">
              Operating System
            </li>
            <li className="text-neutral-500 hover:text-orange-500">
              Networking
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Resources</h3>
          <ul className="space-y-2">
            <li className="text-neutral-500 hover:text-orange-500">Notes</li>
            <li className="text-neutral-500 hover:text-orange-500">
              Full details Notes
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Community</h3>
          <ul className="space-y-2">
            <li className="text-neutral-500 hover:text-orange-500">
              Suggest Topics
            </li>
            <li className="text-neutral-500 hover:text-orange-500">
              Report Issues
            </li>
            <li className="text-neutral-500 hover:text-orange-500">GitHub</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <p>© 2026 CampusCodex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
