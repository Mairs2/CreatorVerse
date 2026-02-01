import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { supabase } from "../client";

const ViewCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchCreator = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                setError("Creator not found");
                console.error("Error fetching creator:", error);
            } else {
                setCreator(data);
            }
            setLoading(false);
        };

        fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this creator?")) {
            return;
        }

        setDeleting(true);
        const { error } = await supabase
            .from("creators")
            .delete()
            .eq("id", id);

        if (error) {
            setError("Failed to delete creator. Please try again.");
            console.error("Error deleting creator:", error);
            setDeleting(false);
        } else {
            navigate("/");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !creator) {
        return (
            <Box sx={{ padding: 4 }}>
                <Alert severity="error">{error || "Creator not found"}</Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/")}
                    sx={{ mt: 2, color: "white" }}
                >
                    Back to Creators
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{ mb: 2, color: "white" }}
            >
                Back to Creators
            </Button>

            <Box
                component="img"
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

            <Typography variant="h3" component="h1" gutterBottom>
                {creator.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                {creator.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {creator.instagram && (
                    <IconButton
                        color="primary"
                        component="a"
                        href={creator.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramIcon />
                    </IconButton>
                )}
                {creator.youtube && (
                    <IconButton
                        color="primary"
                        component="a"
                        href={creator.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <YouTubeIcon />
                    </IconButton>
                )}
                {creator.twitter && (
                    <IconButton
                        color="primary"
                        component="a"
                        href={creator.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <XIcon />
                    </IconButton>
                )}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/edit/${creator.id}`)}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </Button>
            </Box>
        </Box>
    );
};

export default ViewCreator;
