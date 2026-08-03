import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const { setShowLogin, axios, setToken, navigate } = useAppContext();

    const [state, setState] = React.useState("login");

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [otp, setOtp] = React.useState("");
    const [showOtpBox, setShowOtpBox] = React.useState(false);

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try {

            // ================= LOGIN =================

            if (state === "login") {

                const { data } = await axios.post("/api/user/login", {
                    email,
                    password
                });

                if (data.success) {

                    localStorage.setItem("token", data.token);
                    setToken(data.token);

                    toast.success("Login Successful");

                    setShowLogin(false);

                    navigate("/");

                } else {

                    toast.error(data.message);

                }

                return;
            }

            // ============== SEND OTP ==============

            if (!showOtpBox) {

                const { data } = await axios.post("/api/otp/send", {
                    email
                });

                if (data.success) {

                    toast.success("OTP sent to your email");

                    setShowOtpBox(true);

                } else {

                    toast.error(data.message);

                }

                return;
            }

            // ============== VERIFY OTP ==============

            const otpResponse = await axios.post("/api/otp/verify", {
                email,
                otp
            });

            if (!otpResponse.data.success) {

                toast.error(otpResponse.data.message);

                return;
            }

            // ============== CREATE ACCOUNT ==============

            const registerResponse = await axios.post("/api/user/register", {
                name,
                email,
                password
            });

            if (registerResponse.data.success) {

                localStorage.setItem("token", registerResponse.data.token);

                setToken(registerResponse.data.token);

                toast.success("Account created successfully 🎉");

                setShowLogin(false);

                navigate("/");

            } else {

                toast.error(registerResponse.data.message);

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || error.message
            );

        }

    };

    // Reset OTP UI when switching between Login and Register
    const switchState = (newState) => {
        setState(newState);
        setShowOtpBox(false);
        setOtp("");
    };

    return (
        <div
            onClick={() => setShowLogin(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
        >

            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
            >

                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                )}

                <div className="w-full">
                    <p>Email</p>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>

                {state === "register" && showOtpBox && (

                    <div className="w-full">

                        <p>Email OTP</p>

                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary tracking-[8px] text-center text-lg"
                            required
                        />

                    </div>

                )}

                {state === "register" ? (

                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => switchState("login")}
                            className="text-primary cursor-pointer"
                        >
                            Login
                        </span>
                    </p>

                ) : (

                    <p>
                        Create an account?{" "}
                        <span
                            onClick={() => switchState("register")}
                            className="text-primary cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>

                )}

                <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">

                    {state === "login"
                        ? "Login"
                        : showOtpBox
                            ? "Verify OTP & Create Account"
                            : "Send OTP"}

                </button>

            </form>

        </div>
    );
};

export default Login;