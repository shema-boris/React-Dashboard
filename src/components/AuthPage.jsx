import { useState } from "react";
import { FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.agree) newErrors.agree = "You must agree to the terms";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    try {
      if (isLogin) {
        console.log("Logging in with:", form);
        setSuccess("✅ Logged in successfully!");
      } else {
        console.log("Registering new account:", form);
        setSuccess("✅ Account created successfully!");
      }
      setForm({ firstName: "", lastName: "", email: "", password: "", agree: false });
      setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleAppleLogin = () => {
    window.location.href = "https://appleid.apple.com/auth/authorize";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">
      
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            {isLogin ? "Welcome Back 👋" : "Create an Account"}
          </h1>
          <p className="text-indigo-100 text-sm mt-2">
            {isLogin ? "Sign in to continue" : "Start your journey today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.firstName && <p className="text-pink-300 text-xs">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.lastName && <p className="text-pink-300 text-xs">{errors.lastName}</p>}
              </div>
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.email && <p className="text-pink-300 text-xs">{errors.email}</p>}

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-pink-300 text-xs">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-200">
                I agree to the{" "}
                <a href="#" className="text-blue-300 hover:text-blue-400 underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-300 hover:text-blue-400 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </motion.button>

          {success && <p className="text-green-200 text-sm text-center">{success}</p>}
          {errors.general && <p className="text-red-300 text-sm text-center">{errors.general}</p>}
        </form>

        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-300 text-sm">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setSuccess("");
                setErrors({});
              }}
              className="text-blue-300 hover:text-blue-400 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </span>
        </div>

        {/* OAuth Buttons */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center text-gray-300 text-sm">
            <span className="px-2">or continue with</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center py-2.5 rounded-xl bg-white/10 border border-white/30 text-white hover:bg-white/20 transition"
            >
              <FaGoogle className="text-red-400 text-lg" />
              <span className="ml-2 text-sm">Google</span>
            </button>
            <button
              onClick={handleAppleLogin}
              className="flex items-center justify-center py-2.5 rounded-xl bg-white/10 border border-white/30 text-white hover:bg-white/20 transition"
            >
              <FaApple className="text-gray-200 text-lg" />
              <span className="ml-2 text-sm">Apple</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
