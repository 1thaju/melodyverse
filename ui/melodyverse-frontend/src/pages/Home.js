import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return <h1 className="text-center text-xl mt-10">Welcome to MelodyVerse 🎵</h1>;
}
export default Home;
