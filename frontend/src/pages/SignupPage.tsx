import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { Link,useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkAlreadyLogged = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/api/auth/check", {
    //                 method: "GET",
    //                 credentials: "include",
    //             });

    //             const data = await response.json();
    //             console.log(data)
    //             if (data.success) {
    //                 toast("Already logged in, Redirecting...");
    //                 navigate("/home");
    //             }
    //         } catch (error) {
    //             console.error("Error checking login status:", error);
    //         }
    //     };

    //     checkAlreadyLogged();
    // }, [navigate]);

    const { mutate, isError, isPending, error } = useMutation({
        mutationKey: ['signup'],
        mutationFn: async () => {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                credentials: "include"
            })

            if (!response.ok) throw new Error("Something went wrong!")

            return response.json();

        },
        onSuccess: (data) => {
            toast.success("Signup Successfull")
            navigate("/home")
            // console.log(data)
        },
        onError: (error) => {
            console.warn(error)
            toast.error("Something went wrong!")
        }
    })

    const onSubmit = () => {
        mutate();
    }

    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col justify-center gap-4 items-center h-screen bg-neutral-100">
                <span>Create your account to get started!</span>

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
                    disabled={isPending}
                >
                    {isPending ? "Signing up..." : "Sign up"}
                </button>

                {isError && (
                    <span className="text-red-500">Error: {error.message}</span>
                )}

                <Link to={"/login"} className="text-sm">
                    <span className="text-gray-500">Already have an acccount?</span>{" "}
                    <u>Login</u>
                </Link>
            </div>

            <div className="flex justify-center items-center h-screen bg-neutral-900">
                <div className="text-center text-white p-6 max-w-lg">
                    <div className="text-3xl font-bold mb-4 text-white">User Auth</div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        "Access your notes and tasks securely with our authentication routes. Register and log in easily to stay organized. Simplify your workflow!"
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage
