import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { signupUser } from "../utils/auth";

function Signup({ onAuth }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !fullName ||
      !email ||
      !age ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (isNaN(age) || age < 18) {
      setError("Age must be a number >= 18");
      return;
    }
    try {
      const response = await signupUser({
        fullName,
        email,
        age,
        username,
        password,
      });
      if (response.ok) {
        onAuth({ fullName, email, age, username, password });
      } else {
        setError("Signup failed. Please try again.");
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
          Create Account
        </h2>
        {error && (
          <p className="text-red-600 mb-4 dark:text-red-400">{error}</p>
        )}
        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          <Input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          <Button
            text="Signup"
            className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
            type="submit"
          />
        </div>
        <p className="mt-4 text-center dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-2 dark:text-primary-1">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";
// import { signupUser } from "../utils/auth";

// function Signup({ onAuth }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (
//       !fullName ||
//       !email ||
//       !age ||
//       !username ||
//       !password ||
//       !confirmPassword
//     ) {
//       setError("All fields required");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     if (isNaN(age) || age < 18) {
//       setError("Age must be a number >= 18");
//       return;
//     }
//     try {
//       const response = await signupUser({
//         fullName,
//         email,
//         age,
//         username,
//         password,
//       });
//       if (response.ok) {
//         onAuth({ fullName, email, age, username, password });
//       } else {
//         setError("Signup failed. Please try again.");
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
//           Create Account
//         </h2>
//         {error && <p className="text-red-600 mb-4">{error}</p>}
//         <div className="space-y-4">
//           <Input
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />
//           <Input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             type="number"
//             placeholder="Age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
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
//           <Input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button text="Signup" className="w-full" type="submit" />
//         </div>
//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-eco-green">
//             Login
//           </Link>
//         </p>
//       </form>
//     </section>
//   );
// }

// export default Signup;
