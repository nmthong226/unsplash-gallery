import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [strengthText, setStrengthText] = useState("");
    const [strengthPercentage, setStrengthPercentage] = useState(0);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            resolver: undefined,
            criteriaMode: "firstError",
        }
    );
    const onSubmit = (data: any) => {
        console.log('Submitted Data:', data);
        // To log individual fields, you can access them like this:
        console.log('Username:', data.Username);
        console.log('Email:', data.Email);
        console.log('Password:', data.Password);
    };
    console.log(errors);


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
            className="flex justify-end items-center w-full h-full">
            <div className="flex flex-col w-96 mr-80 space-y-2">
                <h1 className="text-3xl font-bold mb-6 text-nowrap">Sign up and start exploring</h1>
                <div className="flex flex-col relative z-0 w-96 mb-2 group">
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
                <div className="flex flex-col relative z-0 w-96 mb-2 group">
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
                <div className="flex relative z-0 w-96 mb-2 group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="floating_password"
                        className="block py-4 px-2 w-full text-sm font-normal text-gray-900 bg-transparent border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        {...register("Password", { required: true, minLength: 3, onChange: (e) => handlePasswordChange(e) }
                        )} // minLength instead of min
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
                </div>
                <div className="flex z-0 w-96">
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div
                                key={index}
                                className={`w-7 border-4 rounded-sm border-t border-gray-400 ${strengthPercentage > index * 20 ? "border-blue-600" : "border-gray-400"
                                    }`}
                            ></div>
                        ))}
                    </div>
                    <div className={`flex items-center text-[13px] h-4 text-gray-600 ml-2 my-2`}>{strengthText}</div>
                </div>
                <button type="submit" className="flex justify-center items-center relative z-0 w-96 h-14 group p-2 bg-blue-900 hover:bg-blue-800 hover:cursor-pointer">
                    <p className="text-white font-bold">Sign Up</p>
                </button>
                <div className="flex justify-center items-center relative z-0 w-96 h-14 group p-2 bg-gray-100">
                    <p className="text-gray-600 font-bold">Already have an account? <span className="hover:cursor-pointer font-bold underline text-blue-800" onClick={navigateToLogIn}>Login</span></p>
                </div>
            </div>
        </form>
    )
}

export default SignUp;
