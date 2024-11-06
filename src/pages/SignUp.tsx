import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [strengthText, setStrengthText] = useState("");
    const [strengthPercentage, setStrengthPercentage] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            resolver: undefined,
            criteriaMode: "firstError",
        }
    );

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(import.meta.env.VITE_REGISTER_API, {
                username: data.Username,
                email: data.Email,
                password: data.Password,
            });
            navigate("/login", { replace: true });
        } catch (error: any) {
            if (error.message && error.message.includes("409")) {
                setError("Your email already exists. Please try another one.");
            } else {
                setError(error.message || "An unknown error occurred");
            }
        }
    };

    const calculateStrength = (password: string) => {
        let strength = 0;
        // Length check
        if (password.length >= 4) strength += 20; // Minimum 4 characters
        if (password.length >= 8) strength += 20; // More characters
        if (password.length >= 12) strength += 20; // Strong length
        if (/[A-Z]/.test(password) && password.length >= 4) strength += 20; // Uppercase letter
        if (/[0-9]/.test(password)) strength += 20; // Number
        if (/[\W_]/.test(password)) strength += 20; // Special character
        setStrengthPercentage(strength);

        // Set strength text based on calculated strength
        if (strength === 0) {
            setStrengthText("");
        } else if (strength > 0 && strength <= 20) {
            setStrengthText("Too weak");
        } else if (strength > 20 && strength <= 40) {
            setStrengthText("Could be better");
        } else if (strength > 40 && strength <= 60) {
            setStrengthText("Ok");
        } else if (strength > 60 && strength <= 80) {
            setStrengthText("Strong");
        } else if (strength > 80) {
            setStrengthText("Very strong");
        }
    };

    useEffect(() => {
        calculateStrength(""); // Initialize strength text on load
    }, []);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        calculateStrength(newPassword);
    };

    const navigateToLogIn = () => {
        navigate("/login", { replace: true });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col w-[320px] sm:w-[420px] h-[600px] justify-center items-center p-2 border shadow-md rounded-lg space-y-2">
                <div className="flex flex-col mb-6 justify-center items-center space-y-2">
                    <h1 className="text-xl sm:text-3xl font-bold text-nowrap">Sign up and start exploring</h1>
                    <p className="text-red-500 text-[13px]">{error ? error : ""}</p>
                </div>
                <div className="flex flex-col relative z-0 w-[300px] sm:w-96 mb-2 group">
                    <input
                        type="text"
                        id="Username"
                        className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register("Username", { required: "Username is required", maxLength: { value: 50, message: "Max length is 50" } })}
                    />
                    <label
                        htmlFor="Username"
                        className="peer-focus:font-bold absolute text-sm font-bold text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 pl-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                        Fullname
                    </label>
                    {/* Error Message for Username */}
                    <ErrorMessage
                        errors={errors}
                        name="Username"  // Use the correct name here
                        render={({ message }) => <p className="text-[13px] text-red-700">*{message}</p>}
                    />
                </div>

                {/* Email Input */}
                <div className="flex flex-col relative z-0 w-[300px] sm:w-96 mb-2 group">
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
                <div className="flex flex-col relative z-0 w-[300px] sm:w-96 mb-2 group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="Password"
                        className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register("Password", { required: "Password is required", minLength: { value: 3, message: "Min length is 3" }, onChange: (e) => handlePasswordChange(e) })}
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
                <div className="flex z-0 w-[300px] sm:w-96">
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div
                                key={index}
                                className={`w-7 border-4 rounded-sm border-t border-gray-400 ${strengthPercentage > index * 20 ? "border-blue-600" : "border-gray-400"
                                    }`}
                            ></div>
                        ))}
                    </div>
                    <div className={`flex items-center text-[13px] h-4 text-gray-600 ml-2 my-1 ${strengthPercentage >= 80 ? "text-green-600" : strengthPercentage >= 40 ? "text-yellow-500" : "text-red-600"}`}>
                        {strengthText}
                    </div>
                </div>
                <div className="flex flex-col w-full sm w-[300px]:sm:w-96 items-start mb-2">
                    <button type="submit" className="text-white bg-blue-900 hover:bg-blue-800 w-full h-12 rounded-md transition duration-200">
                        Sign Up
                    </button>
                </div>
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <span onClick={navigateToLogIn} className="text-blue-600 cursor-pointer hover:underline">Log In</span>
                </p>
            </div>
        </form>
    );
};

export default SignUp;
