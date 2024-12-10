import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";

const App = () => {

  const navigate = useNavigate()

  const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[30%_70%]">

      <div className="flex flex-col justify-center items-center h-[500px] md:h-screen bg-zinc-100 text-neutral-900">
        <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-md text-neutral-700 mb-8 text-center px-4">
          Experience the most secure and efficient way to manage your account with MERN Authentication.
        </p>
        <button onClick={() => navigate("/home")}
          className="bg-neutral-900 text-zinc-100 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-neutral-700 transition-all duration-300">
          Get Started
        </button>
      </div>

      <div className="flex flex-col justify-center items-center h-[240px] md:h-screen bg-neutral-900 text-zinc-100">
        <h2 className="text-3xl font-bold mb-4">MERN Authentication</h2>
        <p className="text-lg text-neutral-400 px-6 text-center">
          Built with MongoDB, Express, React, and Node.js to provide seamless and secure authentication workflows.
        </p>
      </div>

    </div>
  );
};

export default App;
