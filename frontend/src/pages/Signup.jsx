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
