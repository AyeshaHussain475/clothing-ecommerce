import React, { useState } from "react";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import babyImage from "../../assets/baby1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });

      setToken(result.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Incorrect credentials! Try again!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          backgroundImage: `url(${babyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            marginTop: "120px", // Adjust the margin top value as needed
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Login</Typography>
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default Login;
