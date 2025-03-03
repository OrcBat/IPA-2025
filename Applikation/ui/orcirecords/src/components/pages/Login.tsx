import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (auth) {
      const success = await auth.login(username, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" margin="normal" onChange={(e) => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
