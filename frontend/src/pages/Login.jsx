import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { loginUser } from "../utils/auth";

function Login({ onAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("All fields required");
      return;
    }
    try {
      const response = await loginUser({ username, password });
      if (response.ok) {
        onAuth({ username, password });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-tertiary-1 to-secondary-3 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800"
      >
        <h2 className="text-2xl font-bold text-primary-2 mb-6 text-center dark:text-primary-1">
          Login
        </h2>
        {error && (
          <p className="text-red-600 mb-4 dark:text-red-400">{error}</p>
        )}
        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          <Button
            text="Login"
            className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
            type="submit"
          />
        </div>
        <p className="mt-4 text-center dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-2 dark:text-primary-1">
            Create one
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";
// import { loginUser } from "../utils/auth";

// function Login({ onAuth }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!username || !password) {
//       setError("All fields required");
//       return;
//     }
//     try {
//       const response = await loginUser({ username, password });
//       if (response.ok) {
//         onAuth({ username, password });
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <section className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-eco-light to-eco-blue/20">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-eco-green mb-6 text-center">
//           Login
//         </h2>
//         {error && <p className="text-red-600 mb-4">{error}</p>}
//         <div className="space-y-4">
//           <Input
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button text="Login" className="w-full" type="submit" />
//         </div>
//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-eco-green">
//             Create one
//           </Link>
//         </p>
//       </form>
//     </section>
//   );
// }

// export default Login;
