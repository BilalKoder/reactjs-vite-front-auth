import { MouseEvent, useState } from "react";
import { toast} from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-util";
// import { decode } from "js-base64";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AuthPage() {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL; 
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();

  const toggleAuthMode = () => {
      // Reset form fields when toggling between login and signup
      setIsSignup(!isSignup);
      setName("");  // Reset name field for signup
      setEmail(""); // Reset email field
      setPassword(""); // Reset password field
    };
   const validatePassword = (password: string) => {
    const minLength = /.{8,}/; // Min 8 characters
    const containsLetter = /[a-zA-Z]/; // Contains at least 1 letter
    const containsNumber = /\d/; // Contains at least 1 number
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Contains at least 1 special character

    return minLength.test(password) && containsLetter.test(password) && containsNumber.test(password) && containsSpecialChar.test(password);
  };

 

const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault();

  try {
    if (isSignup) {
      if (!name || !email || !password) {
        toast.error("All fields are required for Signup!", { position: "top-right" });
        return;
      }
      if (!validatePassword(password)) {
        toast.error("Password must be at least 8 characters long, contain a letter, a number, and a special character!", { position: "top-right" });
        return;
      }

      const signupPayload = { name, email, password };

      const response = await axios.post(`${baseURL}/auth/register`, signupPayload);

      if (response.data.status === 201 || response.data.status === 200) {
        const { access_token } = response.data.data; // Assuming the token is in the response data
        toast.success("Signup successful! Redirecting to Login...", { position: "top-right" });
        loginUser(access_token);
        navigate("/dashboard");
      }
    } else {
      if (!email || !password) {
        toast.error("Email and Password are required!", { position: "top-right" });
        return;
      }

      const loginPayload = { email, password };

      const response = await axios.post(`${baseURL}/auth/login`, loginPayload);
      console.log('response',response)
      if (response.data.status === 201 || response.data.status === 200) {
        const { access_token } = response.data.data; // Assuming the token is in the response data
        toast.success("Login successful! Redirecting...", { position: "top-right" });
        loginUser(access_token);
        navigate("/dashboard");
      }
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      toast.error(error.response.data.message || "An error occurred!", { position: "top-right" });
    } else {
      // Network or other error
      toast.error("Unable to connect to the server!", { position: "top-right" });
    }
  }
};
return (
  <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat w-full"
    style={{
      backgroundImage: "url('/7555.jpg')", // Replace with your image
    }}
  >
    {/* Centered Card */}
    <div
      className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm backdrop-blur-md bg-opacity-90"
      style={{ background: "#16131c82" }}
    >
      {/* Circle User Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
          <i className="text-white text-3xl fas fa-user"></i>
        </div>
      </div>

      <h2
        className="text-center text-2xl font-bold tracking-tight"
        style={{ color: "#fff" }}
      >
        {isSignup ? "Create your account" : "Sign in to your account"}
      </h2>

      <form className="space-y-6 mt-6">
        {/* Name Field (Only for Signup) */}
        {isSignup && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fas fa-user text-gray-400"></i>
            </div>
            <input
              id="name"
              name="name"
              placeholder="John Wick"
              type="text"
              required
              className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-envelope text-gray-400"></i>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-lock text-gray-400"></i>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>

      {/* Toggle Link */}
      <h4 className="mt-4 text-center text-sm" style={{ color: "#fff" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue font-bold hover:underline"
          style={{ color: "#0c98ff" }}
          onClick={toggleAuthMode}
        >
          {isSignup ? "Sign in" : "Sign up"}
        </button>
      </h4>
    </div>
  </div>
);

}
