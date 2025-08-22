import React, { useState, useEffect } from "react";
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
import ErrorModal from "../components/common/ErrorModal";

function Login({ onAuth }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!emailOrUsername || !password) {
      setError("Email/Username and password are required");
      setLoading(false);
      return;
    }
    const result = await onAuth("login", { emailOrUsername, password });
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    window.handleCredentialResponse = (response) => {
      const data = {
        idToken: response.credential,
        name: "Google User",
      };
      setLoading(true);
      onAuth("google-login", data).then((result) => {
        setLoading(false);
        if (result.error) {
          setError(result.error);
        } else {
          window.location.href = "/";
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onAuth]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="animate-pulse grid w-full max-w-sm grid-cols-1 gap-8">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Logo className="h-6 text-neutral-950 dark:text-white" />
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label>Email or Username</Label>
          <Input
            type="text"
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </Button>
        </div>
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
      <ErrorModal error={error} onClose={() => setError("")} />
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
