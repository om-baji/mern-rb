import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const Home = () => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            This is Home Page
        </div>
    )
}

export default Home
