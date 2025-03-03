import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          OrciRecords
        </Typography>

        {user && (
          <Tabs value={location.pathname} textColor="inherit">
            <Tab
              label="Dashboard"
              component={Link}
              to="/dashboard"
              value="/dashboard"
            />
            <Tab label="Songs" component={Link} to="/songs" value="/songs" />
            <Tab
              label="Playlists"
              component={Link}
              to="/playlists"
              value="/playlists"
            />
            <Tab
              label="Artists"
              component={Link}
              to="/artists"
              value="/artists"
            />
            <Tab label="Genres" component={Link} to="/genres" value="/genres" />
          </Tabs>
        )}

        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
