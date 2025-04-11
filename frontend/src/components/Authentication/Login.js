import { VStack, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {};
  return (
    <VStack>
      <Fieldset.Root size="lg" maxW="full">
        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
      <Button
        colorPalette="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorPalette="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
