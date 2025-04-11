import { VStack, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = () => {};

  const postDetails = (pics) => {};
  return (
    <VStack>
      <Fieldset.Root size="lg" maxW="full">
        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>Name</Field.Label>
            <Input
              name="name"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>

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

          <Field.Root required>
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Upload Your Picture</Field.Label>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          colorScheme="teal"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={picLoading}
        >
          Sign Up
        </Button>
      </Fieldset.Root>
    </VStack>
  );
};

export default SignUp;
