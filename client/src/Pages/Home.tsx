import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../config";
type User = {
    name: string,
    email: string,
    createdAt: Date

}

const Home = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const [user, setUser] = useState<User | null>(null)
    const [loading,setLaoding] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {

        const getUser = async () => {
            try {

                const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })

                if (!response.ok) throw new Error("Something went wrong!")

                const data = await response.json()

                setUser(data.user)

                setLaoding(false)

            } catch (error) {
                console.warn(error)
            }
        }

        getUser();

    }, [])

    const handleLogout = async () => {
        try {

            const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
                method : "GET",
                credentials : "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })

            if(!response.ok) throw new Error("Something went wrong!")

            localStorage.removeItem("accessToken")
            toast.success("Logged Out!")
            navigate("/login")
            
        } catch (error) {
            console.warn(error)
            toast.error("Something went wrong!")
        }
    }

    if(loading) {
        return <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="p-6 bg-white shadow-md rounded-md space-y-4">
                <ul className="space-y-2 text-gray-800">
                    <li><strong>Name:</strong> {user?.name}</li>
                    <li><strong>Email:</strong> {user?.email}</li>
                    <li><strong>Created:</strong> {new Date(user?.createdAt as Date).toLocaleString()}</li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                >
                    Log Out
                </button>
            </div>
        </div>

    )
}

export default Home
