import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth?.user) {
    navigate("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">
        Welcome to the {auth.user.username} dashboard
      </Typography>
    </Container>
  );
};

export default Dashboard;
