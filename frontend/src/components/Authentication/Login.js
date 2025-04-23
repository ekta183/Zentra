import { VStack, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { PasswordInput } from "../ui/password-input";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please Fill all the Feilds", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://zentra-backend-i9va.onrender.com/api/user/login",
        { email, password },
        config
      );

      toast.success("Login Successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error(`Error Occured! ${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setLoading(false);
    }
  };
  return (
    <VStack>
      <Fieldset.Root size="lg" maxW="full">
        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>Email address</Field.Label>
            <Input
              name="email"
              type="email"
              value={email}
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              value={password}
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
        loading={loading}
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
      <ToastContainer />
    </VStack>
  );
};

export default Login;
