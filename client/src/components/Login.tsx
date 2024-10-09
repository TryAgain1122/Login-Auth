import { FormEvent, useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      console.log(response, "Login successfully");
      navigate('/dashboard');
      toast.success("Welcome")
    } catch (error) {
      toast.error("Invalid Username or password")
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex justify-center">
        <div className="max-w-lg w-full min-h-screen flex items-center justify-center">
          <div className="w-full flex flex-col justify-center items-center h-[540px] bg-gray-200 space-y-2 shadow-lg rounded-md">
            <div className="flex flex-col w-[80%] space-y-2">
              <h1 className="text-3xl font-bold text-center">Login</h1>
              <label className="text-xl">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 p-3 focus:outline-none focus:right-2 focus:ring-blue-400 transition-all duration-300 rounded-md"
              />
            </div>

            <div className="flex flex-col w-[80%] space-y-2">
              <label className="text-xl">Password</label>
              <input
                type="password"
                placeholder="Enter email"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 p-3 focus:outline-none focus:right-2 focus:ring-blue-400 transition-all duration-300 rounded-md mb-7"
              />
            </div>
            <div className="mt-5 w-[80%]">
                <p className="mb-3 font-semibold text-md hover:underline cursor-pointer duration-300"><Link to={'/register'}>Register</Link> </p>
            <button 
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-300 cursor-pointer focus:outline-none focus:ring-2 focus:to-blue-500 transition-all duration-300"
            >Login</button>
            </div>
           
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
