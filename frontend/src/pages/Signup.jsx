import React, { useState, useEffect } from "react";
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
import ErrorModal from "../components/common/ErrorModal";

function Signup({ onAuth }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        pwd
      )
    )
      return "Strong";
    return "Medium";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(validatePassword(pwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      !email ||
      !username ||
      !name ||
      !password ||
      !confirmPassword ||
      !country
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (passwordStrength !== "Strong") {
      setError(
        "Password must be at least 6 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      setLoading(false);
      return;
    }
    const result = await onAuth("signup", {
      email,
      username,
      name,
      password,
      country,
    });
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
        username: "google_user_" + Date.now(),
        email: "google_user_" + Date.now() + "@example.com",
        country: "Unknown",
      };
      setLoading(true);
      onAuth("google-signup", data).then((result) => {
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
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
        <Heading>Create your account</Heading>
        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Full name</Label>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          {passwordStrength && (
            <div className="mt-2 flex items-center">
              <div
                className={`h-2 w-1/3 rounded-full ${
                  passwordStrength === "Weak"
                    ? "bg-red-500"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Strength: {passwordStrength}
              </span>
            </div>
          )}
        </Field>
        <Field>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>
        <Field>
          <Label>Country</Label>
          <Select
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select a country</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
        </Field>
        <div className="flex items-center">
          <Checkbox name="newsletter" />
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
          text-neutral-950
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
      <ErrorModal error={error} onClose={() => setError("")} />
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
