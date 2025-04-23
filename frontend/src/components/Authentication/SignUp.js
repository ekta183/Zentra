import { VStack, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import React from "react";
import { PasswordInput } from "../ui/password-input";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { toaster } from "../ui/toaster";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast.warn("Passwords Do Not Match", {
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
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://zentra-backend-i9va.onrender.com/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);

      toast.success("Registration Successful", {
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
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
    console.log("Form submitted");
  };

  const postDetails = (pics) => {
    console.log("Image selected", pics);
    setPicLoading(true);
    if (!pics) {
      toast.error("Please Select an Image!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setPicLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "zentra");
      data.append("cloud_name", "dnda6acrj");

      fetch("https://api.cloudinary.com/v1_1/dnda6acrj/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log("Photo uploaded");
          toast.success("Photo uploaded", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          setPicLoading(false);
          setPicLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setPicLoading(false);
        });
    } else {
      toast.error("Please Select a valid Image!", {
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
      setPicLoading(false);
    }
  };
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
          loading={picLoading}
        >
          Sign Up
        </Button>
      </Fieldset.Root>
      <ToastContainer />
    </VStack>
  );
};

export default SignUp;
