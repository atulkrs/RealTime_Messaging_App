import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const [animate, setAnimate] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setAnimate(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const isFormValid =
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "";

    if (!isFormValid) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signup(formData);
    } catch (error) {
      toast.error(error.message || "Signup failed");
    }
  };

  const calcParallax = {
    transform: `translate3d(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${
      (mousePos.y - window.innerHeight / 2) * 0.02
    }px, 0)`,
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-purple-600 to-pink-400
       flex items-center justify-center p-6 font-sans"
      style={{ height: "100vh" }}
    >
      <div
        style={calcParallax}
        className={`relative w-full max-w-md bg-white border border-purple-300 rounded-3xl shadow-lg
          p-10 space-y-10 transition-opacity duration-700 overflow-hidden
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
       
        <div className="text-center select-none">
          <h1 className="text-4xl font-extrabold tracking-wide text-purple-700">Create Account</h1>
          <p className="mt-1 text-purple-500 tracking-wide text-sm font-semibold">
            Join us and start your messaging journey
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-8">
        
          <div className="relative group">
            <input
              id="name"
              type="text"
              placeholder=" "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="peer w-full rounded-xl bg-purple-50 border border-purple-300 px-5 pt-6 pb-2 text-purple-700 placeholder-transparent
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition duration-300 shadow-sm"
              required
              autoComplete="name"
            />
            <label
              htmlFor="name"
              className="absolute left-5 top-3 text-purple-500 text-sm font-semibold pointer-events-none
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400
                peer-focus:top-3 peer-focus:text-sm peer-focus:text-purple-600 transition-all duration-300 ease-in-out select-none"
            >
              <div className="inline-flex items-center gap-2">
                <User className="w-5 h-5" />
                Name
              </div>
            </label>
          </div>

      
          <div className="relative group">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="peer w-full rounded-xl bg-purple-50 border border-purple-300 px-5 pt-6 pb-2 text-purple-700 placeholder-transparent
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition duration-300 shadow-sm"
              required
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="absolute left-5 top-3 text-purple-500 text-sm font-semibold pointer-events-none
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400
                peer-focus:top-3 peer-focus:text-sm peer-focus:text-purple-600 transition-all duration-300 ease-in-out select-none"
            >
              <div className="inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
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
              className="peer w-full rounded-xl bg-purple-50 border border-purple-300 px-5 pt-6 pb-2 text-purple-700 placeholder-transparent
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-transparent transition duration-300 shadow-sm"
              required
              autoComplete="new-password"
            />
            <label
              htmlFor="password"
              className="absolute left-5 top-3 text-purple-500 text-sm font-semibold pointer-events-none
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400
                peer-focus:top-3 peer-focus:text-sm peer-focus:text-purple-600 transition-all duration-300 ease-in-out select-none"
            >
              <div className="inline-flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Password
              </div>
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700 transition"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>

        
          <button
            type="submit"
            disabled={isSigningUp}
            className={`w-full py-3 rounded-xl font-extrabold
              bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md
              hover:shadow-lg active:scale-[0.97]
              transition transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              flex justify-center items-center gap-3 ${isSigningUp ? "animate-pulse" : ""}`}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

 
        <p className="text-center text-purple-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-2 hover:text-pink-600 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
