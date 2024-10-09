import { FormEvent, useState } from "react";
import { registerUser } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(firstname, lastname, email, password);
      console.log(response.data);
      toast.success("Register successfully");
      navigate('/login');
    } catch (error) {
      toast.error("Invalid registration")
      console.log(error)
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex justify-center items-center h-screen">
        <div className="max-w-md w-full">
          
          <div className="w-full bg-gray-200 h-[500px] flex justify-center shadow-lg">
          
            <div className="w-[80%] flex flex-col  justify-center space-y-1">
            <h2 className="text-3xl font-semibold text-center mb-3">Register</h2>
              <div className="w-full flex flex-col">
                <label className="text-lg font-semibold">Firstname</label>
                <input
                  type="text"
                  placeholder="Enter firstname"
                  required
                  className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="text-lg font-semibold">Lastname</label>
                <input
                  type="text"
                  placeholder="Enter lastname"
                  required
                  className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="text-lg font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  required
                  className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="text-lg font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  required
                  className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full">
              <button className="bg-blue-500 w-full mt-4 p-2 text-white text- rounded-md transition-all duration-300 hover:bg-blue-800">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
