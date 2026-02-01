import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { creators } from "../data/creators";

const ViewCreator = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const creator = creators.find((c) => c.id === Number(id));

    if (!creator) {
        return ( 
            <Box sx={{padding: 4 }} >
                <Alert severity = "error"> Creator not found</Alert>
                <Button startIcon ={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{mt: 2 }}>
                    Back to Creators
                </Button>
            </Box>
        )
    };

    const handleDelete =() => { 

        alert ("Delete functionality is not implemented yet.");
        navigate ("/");
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}> 

        <Button 
        startIcon ={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx = {{ mb: 2 }}>
            Back to Creators
        </Button>

        <Box
            component = "img"
            src={creator.image}
            alt={creator.name}
            sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 2,
                mb: 3,
            }}
        />

        <Typography variant= "h3" component= "h1" gutterBottom>
            {creator.name}
        </Typography>
        <Typography variant= "body1" sx= {{mb:3, color:"text.secondary"}}>
            {creator.description}
        </Typography>
        <Box sx= {{display: "flex", gap: 1, mb: 3}}>
            <IconButton color="primary">
                <InstagramIcon />
            </IconButton>
            <IconButton color="primary">
                <YouTubeIcon />
            </IconButton>
            <IconButton color="primary">
                <XIcon />
            </IconButton> 
        </Box>

        <Box sx={{ display: "flex", gap:2}}>
            <Button  
              variant="contained"
              startIcon ={<EditIcon/>}
              onClick={() => navigate(`/edit/${creator.id}`)}
            >
                Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon ={<DeleteIcon/>}
              onClick={handleDelete}
            >
                Delete 
                
            </Button>

        </Box>

        </Box>
    );
};
export default ViewCreator; 
