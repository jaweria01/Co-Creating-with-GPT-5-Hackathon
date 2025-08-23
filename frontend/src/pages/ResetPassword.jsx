import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import Button from "../components/common/Button";
import Field from "../components/common/Field";
import Label from "../components/common/Label";
import Heading from "../components/common/Heading";
import Input from "../components/common/Input";
import Text from "../components/common/Text";
import TextLink from "../components/common/TextLink";
import Strong from "../components/common/Strong";
import Logo from "../components/common/Logo";

function ResetPassword({ onAuth }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
    };
    try {
      await onAuth("reset-password", data);
      alert("Password reset email sent. Check your inbox.");
    } catch (err) {
      alert("Failed to send reset email. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Logo className="h-6 text-primary-3 dark:text-white" />
        <Heading>Reset your password</Heading>
        <Text>
          Enter your email and we’ll send you a link to reset your password.
        </Text>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </Field>
        <Button
          type="submit"
          className="w-full bg-primary-3 text-white hover:bg-primary-2 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Reset password
        </Button>
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

export default ResetPassword;
