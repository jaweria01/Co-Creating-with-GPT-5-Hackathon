import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import Button from "../components/common/Button";
import Checkbox from "../components/common/Checkbox";
import Field from "../components/common/Field";
import Label from "../components/common/Label";
import Heading from "../components/common/Heading";
import Input from "../components/common/Input";
import Text from "../components/common/Text";
import TextLink from "../components/common/TextLink";
import Strong from "../components/common/Strong";
import Logo from "../components/common/Logo";

function Login({ onAuth }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      await onAuth("login", data);
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    window.handleCredentialResponse = (response) => {
      // Handle Google Sign-In response
      const data = {
        idToken: response.credential,
        name: "Google User", // Replace with actual user data from JWT
      };
      onAuth("google-login", data).catch((err) => {
        alert("Google Sign-In failed.");
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onAuth]);

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Logo className="h-6 text-primary-3 dark:text-white" />
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input type="password" name="password" />
        </Field>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox name="remember" />
            <Label>Remember me</Label>
          </div>
          <Text>
            <TextLink to="/reset-password">
              <Strong>Forgot password?</Strong>
            </TextLink>
          </Text>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Login
        </Button>
        <div
          id="g_id_onload"
          data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          data-callback="handleCredentialResponse"
          data-auto_prompt="false"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="signin_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
        <Text>
          Don’t have an account?{" "}
          <TextLink to="/signup">
            <Strong>Sign up</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
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
//     <section className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-tertiary-1 to-secondary-3 dark:from-gray-900 dark:to-gray-800">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800"
//       >
//         <h2 className="text-2xl font-bold text-primary-2 mb-6 text-center dark:text-primary-1">
//           Login
//         </h2>
//         {error && (
//           <p className="text-red-600 mb-4 dark:text-red-400">{error}</p>
//         )}
//         <div className="space-y-4">
//           <Input
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="dark:bg-gray-700 dark:text-white"
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="dark:bg-gray-700 dark:text-white"
//           />
//           <Button
//             text="Login"
//             className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
//             type="submit"
//           />
//         </div>
//         <p className="mt-4 text-center dark:text-gray-400">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-primary-2 dark:text-primary-1">
//             Create one
//           </Link>
//         </p>
//       </form>
//     </section>
//   );
// }

// export default Login;

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Input from "../components/common/Input";
// // import Button from "../components/common/Button";
// // import { loginUser } from "../utils/auth";

// // function Login({ onAuth }) {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     if (!username || !password) {
// //       setError("All fields required");
// //       return;
// //     }
// //     try {
// //       const response = await loginUser({ username, password });
// //       if (response.ok) {
// //         onAuth({ username, password });
// //       } else {
// //         setError("Login failed. Please check your credentials.");
// //       }
// //     } catch (err) {
// //       setError("An error occurred. Please try again.");
// //     }
// //   };

// //   return (
// //     <section className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-eco-light to-eco-blue/20">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
// //       >
// //         <h2 className="text-2xl font-bold text-eco-green mb-6 text-center">
// //           Login
// //         </h2>
// //         {error && <p className="text-red-600 mb-4">{error}</p>}
// //         <div className="space-y-4">
// //           <Input
// //             placeholder="Username"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //           />
// //           <Input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <Button text="Login" className="w-full" type="submit" />
// //         </div>
// //         <p className="mt-4 text-center">
// //           Don't have an account?{" "}
// //           <Link to="/signup" className="text-eco-green">
// //             Create one
// //           </Link>
// //         </p>
// //       </form>
// //     </section>
// //   );
// // }

// // export default Login;
