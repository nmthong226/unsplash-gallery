import { useState } from "react";
import { FaGoogle, FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: "firstError",
    });

    const onSubmit = async (data: any) => {
        try {
            await login(data);
            navigate('/', {replace: true});
        } catch (e: any) {
            setError(e.message || 'An error occurred');
        }
    };

    const navigateToSignUp = () => {
        navigate('/sign-up', { replace: true });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col w-[320px] sm:w-[420px] h-[600px] justify-center items-center p-2 border shadow-md rounded-lg space-y-2">
                <div className="flex flex-col mb-6 justify-center items-center space-y-2">
                    <h1 className="text-3xl font-bold text-nowrap text-center">Login to Unsplash</h1>
                    <p className="text-red-500 text-[13px]">{error ? error : ""}</p>
                </div>
                {/* Email Input */}
                <div className="flex flex-col relative z-0 w-full sm:w-96 mb-2 group">
                    <input
                        type="text"
                        id="Email"
                        className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register("Email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email is not valid"
                            }
                        })}
                    />
                    <label
                        htmlFor="Email"
                        className="peer-focus:font-bold absolute text-sm font-bold text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Email
                    </label>
                    <ErrorMessage
                        errors={errors}
                        name="Email"
                        render={({ message }) => <p className="text-[13px] text-red-700">*{message}</p>}
                    />
                </div>
                <div className="flex flex-col relative z-0  w-full sm:w-96 mb-2 group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="Password"
                        className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register("Password", { required: "Password is required", minLength: { value: 3, message: "Password must be at least 3 characters" } })}
                    />
                    <label
                        htmlFor="Password"
                        className="peer-focus:font-bold absolute text-sm font-bold text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Password
                    </label>
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer">
                        <FaEye className={`${showPassword ? "" : "hidden"}`} />
                        <FaEyeSlash className={`${showPassword ? "hidden" : ""}`} />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="Password"
                        render={({ message }) => <p className="text-[13px] text-red-700">*{message}</p>}
                    />
                </div>
                <button type="submit" className="flex justify-center items-center relative z-0  w-full sm:w-96 h-14 group p-2 bg-blue-900 hover:bg-blue-800 hover:cursor-pointer">
                    <p className="text-white font-bold">Login</p>
                </button>
                <div className="flex justify-center items-center relative z-0  w-full sm:w-96 h-10 group p-2">
                    <p>or <span className="font-bold underline text-blue-800">Forgot password</span></p>
                </div>
                <div className="flex flex-col justify-center items-center relative z-0  w-full sm:w-96 group p-2">
                    <p className="text-[13px] text-gray-800 mb-2">other log in options</p>
                    <div className="flex flex-row justify-between items-center space-x-4">
                        <div className="p-2 border hover:cursor-pointer">
                            <FaGoogle title="Login with Google" className="size-5" />
                        </div>
                        <div className="p-2 border hover:cursor-pointer">
                            <FaFacebook title="Login with Facebook" className="size-5" />
                        </div>
                        <div className="p-2 border hover:cursor-pointer">
                            <FaApple title="Login with Apple Inc" className="size-5" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center relative z-0  w-full sm:w-96 h-14 group p-2 bg-gray-100">
                    <p className="text-gray-600 font-bold">Didn't have an account? <span className="hover:cursor-pointer font-bold underline text-blue-800" onClick={navigateToSignUp}>Sign Up</span></p>
                </div>
            </div>
        </form>
    );
}

export default LogIn;
