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
import ShareIcon from "@mui/icons-material/Share";

export default function CreatorCard({ id, name, description, image }) {
  const navigate = useNavigate();

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
        <Button size="small" color="primary" startIcon={<ShareIcon />}/>
        
        <Button size="large" color="primary" startIcon={<InstagramIcon />}/>
         
        <Button size="small" color="primary" startIcon={<XIcon />}/>

        <Button size="large" color="primary" startIcon={<YouTubeIcon/>}/>
         
      </CardActions>
    </Card>
  );
}