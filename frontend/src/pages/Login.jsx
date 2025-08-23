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
