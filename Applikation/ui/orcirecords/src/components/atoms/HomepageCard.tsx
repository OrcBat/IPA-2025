import {
  Grid2,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PianoIcon from "@mui/icons-material/Piano";

interface HomepageCardProps {
  title: string;
  description: string;
  nav: string;
}

const HomepageCard: React.FC<HomepageCardProps> = ({
  title,
  description,
  nav,
}) => {
  const navigate = useNavigate();

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {title === "Songs" && (
            <AudiotrackIcon sx={{ width: "50%", height: "50%" }} />
          )}
          {title === "Playlists" && (
            <QueueMusicIcon sx={{ width: "50%", height: "50%" }} />
          )}
          {title === "Artists" && (
            <PersonSearchIcon sx={{ width: "50%", height: "50%" }} />
          )}
          {title === "Genres" && (
            <PianoIcon sx={{ width: "50%", height: "50%" }} />
          )}
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {description}
          </Typography>
          <CardActions>
            <Link
              onClick={() => {
                navigate(nav);
              }}
            >
              <Button size="small">Go to {title} page</Button>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default HomepageCard;
