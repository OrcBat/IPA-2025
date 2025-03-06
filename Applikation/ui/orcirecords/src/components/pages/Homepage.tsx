import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import HomepageCard from "../atoms/HomepageCard";

const Homepage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth?.user) {
    navigate("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" mt={4}>
        Homepage
      </Typography>
      <Typography variant="body1">
        Welcome to the homepage, {auth.user.username}
      </Typography>

      <Grid container spacing={1} mt={5}>
        <HomepageCard
          title="Songs"
          description="Find and Manage Songs"
          nav="/songs"
        />

        <HomepageCard
          title="Playlists"
          description="Manage your Playlists"
          nav="/playlists"
        />

        <HomepageCard
          title="Artists"
          description="Find and Manage Artists"
          nav="/artists"
        />

        <HomepageCard
          title="Genres"
          description="Find and Manage Genres"
          nav="/genres"
        />
      </Grid>
    </Container>
  );
};

export default Homepage;
