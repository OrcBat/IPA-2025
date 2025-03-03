import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../organisms/Navbar";

const DashboardTemplate: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardTemplate;
