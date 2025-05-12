import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Import React Modal
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import success icon
import API_BASE_URL from "../apiConfig.js"; // Import the base URL

Modal.setAppElement("#root"); // Set the root element for accessibility

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data.token);
      setIsModalOpen(true); // Open the modal on success
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal after 2 seconds
        navigate("/home"); // Navigate to the home page
      }, 2000);
    } catch (error) {
      alert(
        "Login failed: " +
          (error.response?.data?.message || "An error occurred")
      );
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <div className="font-mono bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Left Image Section */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://imgc.allpostersimages.com/img/posters/dc-comics-movie-the-dark-knight-batman-in-the-shadows-premium-poster_u-l-f9tm420.jpg?artHeight=550&artPerspective=y&artWidth=550&background=ffffff')",
              }}
            ></div>
            {/* Login Form Section */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form
                onSubmit={handleLogin}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <button
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    onClick={handleNavigateToRegister} // Use navigate function
                  >
                    Create an Account!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center"
        overlayClassName="fixed inset-0 bg-opacity-1 flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <AiOutlineCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold">Login Successful!</h2>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
