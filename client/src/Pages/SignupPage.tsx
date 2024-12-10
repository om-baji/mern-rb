import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import BACKEND_URL from '../config'

const SignUppage = () => {

    const [name,setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name,email, password })
            })

            setIsLoading(true)

            if (!res.ok) throw new Error("Something went wrong!")

            const { accessToken } = await res.json()

            localStorage.setItem("accessToken", accessToken)
            toast.success("Login Successfull!")
            setIsLoading(false)
            navigate("/home")

        } catch (error) {
            toast.error("Something went wrong!")
            console.warn(error)
        }
    }

    return (
        <div className='grid grid-cols-2'>


            <div className='bg-zinc-100 flex flex-col justify-center items-center h-screen gap-4'>

                <span>Welcome back! Log in to continue</span>

                <input
                    placeholder="someone"
                    className="p-2 rounded-md w-[50%]"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="someone@abc.com"
                    className="p-2 rounded-md w-[50%]"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="******"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded-md w-[50%]"
                />

                <button
                    onClick={onSubmit}
                    className="p-2 rounded-md w-[50%] bg-neutral-900 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>

                <Link to={"/login"} className="text-sm">
                    <span className="text-gray-500">Already have an account?</span>{" "}
                    <u>Login</u>
                </Link>

            </div>

            <div className='bg-neutral-900 flex flex-col justify-center items-center h-screen'>
                <p className="text-lg text-neutral-400 px-6 text-center">
                    Built with MongoDB, Express, React, and Node.js to provide seamless and secure authentication workflows.
                </p>
            </div>


        </div>
    )
}

export default SignUppage
