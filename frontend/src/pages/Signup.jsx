import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import Button from "../components/common/Button";
import Checkbox from "../components/common/Checkbox";
import Field from "../components/common/Field";
import Label from "../components/common/Label";
import Heading from "../components/common/Heading";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Text from "../components/common/Text";
import TextLink from "../components/common/TextLink";
import Strong from "../components/common/Strong";
import Logo from "../components/common/Logo";

function Signup({ onAuth }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      country: formData.get("country"),
    };
    try {
      await onAuth("signup", data);
    } catch (err) {
      alert("Signup failed. Please try again.");
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
      onAuth("google-signup", data).catch((err) => {
        alert("Google Sign-Up failed.");
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
        <Heading>Create your account</Heading>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        <Field>
          <Label>Full name</Label>
          <Input name="name" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input type="password" name="password" autoComplete="new-password" />
        </Field>
        <Field>
          <Label>Country</Label>
          <Select name="country">
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
        </Field>
        <div className="flex items-center">
          <Checkbox name="remember" />
          <Label>Get emails about product updates and news.</Label>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Create account
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
          data-text="signup_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        ></div>
        <Text>
          Already have an account?{" "}
          <TextLink to="/login">
            <Strong>Sign in</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
}

export default Signup;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";
// import { signupUser } from "../utils/auth";
// import { AuthLayout } from "@/components/auth-layout";
// import { Checkbox, CheckboxField } from "@/components/checkbox";
// import { Field, Label } from "@/components/fieldset";
// import { Heading } from "@/components/heading";
// import { Select } from "@/components/select";
// import { Strong, Text, TextLink } from "@/components/text";
// import { Logo } from "./logo";

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
//     <section className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-tertiary-1 to-secondary-3 dark:from-gray-900 dark:to-gray-800">
//       <AuthLayout>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800"
//         >
//           <h2 className="text-2xl font-bold text-primary-2 mb-6 text-center dark:text-primary-1">
//             Create Account
//           </h2>
//           {error && (
//             <p className="text-red-600 mb-4 dark:text-red-400">{error}</p>
//           )}
//           <div className="space-y-4">
//             <Input
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Input
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="dark:bg-gray-700 dark:text-white"
//             />
//             <Button
//               text="Signup"
//               className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
//               type="submit"
//             />
//           </div>
//           <p className="mt-4 text-center dark:text-gray-400">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary-2 dark:text-primary-1">
//               Login
//             </Link>
//           </p>
//         </form>
//       </AuthLayout>
//     </section>
//   );
// }

// export default Signup;

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Input from "../components/common/Input";
// // import Button from "../components/common/Button";
// // import { signupUser } from "../utils/auth";

// // function Signup({ onAuth }) {
// //   const [fullName, setFullName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [age, setAge] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     if (
// //       !fullName ||
// //       !email ||
// //       !age ||
// //       !username ||
// //       !password ||
// //       !confirmPassword
// //     ) {
// //       setError("All fields required");
// //       return;
// //     }
// //     if (password !== confirmPassword) {
// //       setError("Passwords do not match");
// //       return;
// //     }
// //     if (isNaN(age) || age < 18) {
// //       setError("Age must be a number >= 18");
// //       return;
// //     }
// //     try {
// //       const response = await signupUser({
// //         fullName,
// //         email,
// //         age,
// //         username,
// //         password,
// //       });
// //       if (response.ok) {
// //         onAuth({ fullName, email, age, username, password });
// //       } else {
// //         setError("Signup failed. Please try again.");
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
// //           Create Account
// //         </h2>
// //         {error && <p className="text-red-600 mb-4">{error}</p>}
// //         <div className="space-y-4">
// //           <Input
// //             placeholder="Full Name"
// //             value={fullName}
// //             onChange={(e) => setFullName(e.target.value)}
// //           />
// //           <Input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           <Input
// //             type="number"
// //             placeholder="Age"
// //             value={age}
// //             onChange={(e) => setAge(e.target.value)}
// //           />
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
// //           <Input
// //             type="password"
// //             placeholder="Confirm Password"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //           />
// //           <Button text="Signup" className="w-full" type="submit" />
// //         </div>
// //         <p className="mt-4 text-center">
// //           Already have an account?{" "}
// //           <Link to="/login" className="text-eco-green">
// //             Login
// //           </Link>
// //         </p>
// //       </form>
// //     </section>
// //   );
// // }

// // export default Signup;
