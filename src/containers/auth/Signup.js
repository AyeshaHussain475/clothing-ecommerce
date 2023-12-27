import React, { useState } from "react";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:5000/api/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("User created Sucessfully!");
      navigate("/login");
    } catch (error) {
      toast.error("User is not created! Try again!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack
        spacing={2}
        sx={{
          marginTop: "50px", //Adjust the margin top value as needed
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <TextField
          fullWidth
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
