import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from "@mui/icons-material/Instagram";

export default function CreatorCard({ id, name, description, image, instagram, twitter, youtube }) {
  const navigate = useNavigate();

  const handleSocialClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/view/${id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={image || "/static/images/cards/contemplative-reptile.jpg"}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {instagram && (
          <Button
            size="large"
            color="primary"
            startIcon={<InstagramIcon />}
            onClick={(e) => handleSocialClick(e, instagram)}
          />
        )}

        {twitter && (
          <Button
            size="small"
            color="primary"
            startIcon={<XIcon />}
            onClick={(e) => handleSocialClick(e, twitter)}
          />
        )}

        {youtube && (
          <Button
            size="large"
            color="primary"
            startIcon={<YouTubeIcon/>}
            onClick={(e) => handleSocialClick(e, youtube)}
          />
        )}

      </CardActions>
    </Card>
  );
}