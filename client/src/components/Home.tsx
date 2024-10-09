import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-3">
        <Link to={"/login"} className="text-3xl font-bold p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-800 transition-all duration-300">
            Login
        </Link>
        <Link to={"/register"} className="text-3xl font-bold p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-800 transition-all duration-300">
            Register
        </Link>
    </div>
  )
}

export default Home