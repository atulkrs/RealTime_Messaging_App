import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const isFormValid = formData.email.trim() && formData.password.trim();

  const [animate, setAnimate] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setAnimate(true);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const calcParallax = {
    transform: `translate3d(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px, 0)`,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-purple-600 to-pink-400 flex items-center justify-center p-6 text-gray-900 font-sans">
      
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <svg className="w-full h-full" preserveAspectRatio="none" >
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#glowGradient)" />
        </svg>
      </div>

      <div
        style={calcParallax}
        className={`
          relative w-full max-w-md bg-white/70 border border-purple-300 rounded-3xl shadow-[0_0_20px_#c4b5fd80]
          backdrop-blur-md p-10 space-y-10 transition-opacity duration-700
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        
        <div className="text-center select-none">
          <h1 className="text-5xl font-extrabold tracking-wider text-purple-700">
            Welcome Back
          </h1>
          <p className="mt-1 text-purple-500 tracking-wide text-sm font-semibold">
            Sign in to continue your journey
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="relative group">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="
                peer w-full rounded-2xl bg-white border-2 border-purple-300
                px-6 pt-7 pb-3 text-gray-800 placeholder-transparent
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-300
                transition duration-300
                shadow-[0_0_12px_#d8b4fe80]
                caret-purple-600
                font-semibold
                text-base
                tracking-wide
              "
              required
              autoComplete="email"
              spellCheck="false"
            />
            <label
              htmlFor="email"
              className="
                absolute left-6 top-3 text-purple-500 text-sm font-semibold pointer-events-none
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400/70
                peer-focus:top-3 peer-focus:text-sm peer-focus:text-purple-600
                transition-all duration-300 ease-in-out
                select-none
              "
            >
              <div className="inline-flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                Email
              </div>
            </label>
          </div>

          
          <div className="relative group">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="
                peer w-full rounded-2xl bg-white border-2 border-purple-300
                px-6 pt-7 pb-3 text-gray-800 placeholder-transparent
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-300
                transition duration-300
                shadow-[0_0_12px_#d8b4fe80]
                caret-purple-600
                font-semibold
                text-base
                tracking-wide
              "
              required
              autoComplete="current-password"
              spellCheck="false"
            />
            <label
              htmlFor="password"
              className="
                absolute left-6 top-3 text-purple-500 text-sm font-semibold pointer-events-none
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400/70
                peer-focus:top-3 peer-focus:text-sm peer-focus:text-purple-600
                transition-all duration-300 ease-in-out
                select-none
              "
            >
              <div className="inline-flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-500" />
                Password
              </div>
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700 transition"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>

          
          <button
            type="submit"
            disabled={isLoggingIn || !isFormValid}
            className={`
              w-full py-3 rounded-xl font-extrabold
              bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400
              text-white shadow-[0_0_20px_#d8b4fecc]
              hover:shadow-[0_0_30px_#f9a8d4cc]
              active:scale-[0.97] active:shadow-[0_0_15px_#a78bfa]
              transition transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3
              ${isLoggingIn ? "animate-pulse" : ""}
            `}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

       
        <p className="text-center text-purple-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline underline-offset-2 hover:text-pink-400 font-semibold">
            Sign up
          </Link>
        </p>
      </div>

      
      <div className="pointer-events-none fixed inset-0 mix-blend-screen opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-pink-300 filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-purple-300 filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default LoginPage;
