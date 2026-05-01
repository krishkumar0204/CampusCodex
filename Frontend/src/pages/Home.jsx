import Hero from "../components/Hero";
import dbmsImg from "../assets/DBMS.png";
import aiImg from "../assets/AI.png";
import fullStackImg from "../assets/Full_Stack.png";
import dsaImg from "../assets/DSA.png";
import computerNetworkingImg from "../assets/Computer_Networking.png";
import operatingSystemImg from "../assets/Operating_System.png";

const Home = () => {
  const subjects = [
    {
      title: "DBMS",
      desc: "Learn databases, SQL, normalization, and system design basics",
      image: dbmsImg,
    },
    {
      title: "AI",
      desc: "Explore machine learning, neural networks, and intelligent systems",
      image: aiImg,
    },
    {
      title: "Full Stack development",
      desc: "Master frontend, backend, and full-stack development",
      image: fullStackImg,
    },
    {
      title: "DSA",
      desc: "Improve problem-solving with data structures & algorithms",
      image: dsaImg,
    },
    {
      title: "Computer Networking",
      desc: "Understand protocols, OSI model, and network architecture",
      image: computerNetworkingImg,
    },
    {
      title: "Operating System",
      desc: "Learn processes, threads, memory management, and scheduling",
      image: operatingSystemImg,
    },
  ];
  return (
    <>
      <div>
        <Hero subjects={subjects} />
      </div>
    </>
  );
};

export default Home;
