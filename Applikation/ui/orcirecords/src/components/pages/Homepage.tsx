import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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

      <Grid container spacing={1} mt={2}>
        {/* Card 1: Songs Page */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Songs Page
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Find and Manage Songs
              </Typography>
              <CardActions>
                <Link
                  onClick={() => {
                    navigate("/songs");
                  }}
                >
                  <Button size="small">Go to Songs Page</Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Playlists Page */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Playlists Page
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Manage your Playlists
              </Typography>
              <CardActions>
                <Link
                  onClick={() => {
                    navigate("/playlists");
                  }}
                >
                  <Button size="small">Go to Playlists Page</Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Artists Page */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Artists Page
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Find and Manage Artists
              </Typography>
              <CardActions>
                <Link
                  onClick={() => {
                    navigate("/artists");
                  }}
                >
                  <Button size="small">Go to Artists Page</Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 4: Genres Page */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Genres Page
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Find and Manage Genres
              </Typography>
              <CardActions>
                <Link
                  onClick={() => {
                    navigate("/genres");
                  }}
                >
                  <Button size="small">Go to Genres Page</Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
