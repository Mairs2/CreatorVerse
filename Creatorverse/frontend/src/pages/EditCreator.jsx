import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { supabase } from "../client";

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        instagram: "",
        twitter: "",
        youtube: "",
    });

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
                setError("Failed to load creator. Please try again.");
                console.error("Error fetching creator:", error);
            } else if (data) {
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    image: data.image || "",
                    instagram: data.instagram || "",
                    twitter: data.twitter || "",
                    youtube: data.youtube || "",
                });
            }
            setLoading(false);
        };

        fetchCreator();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const { error } = await supabase
            .from("creators")
            .update({
                name: formData.name,
                description: formData.description,
                image: formData.image,
                instagram: formData.instagram,
                twitter: formData.twitter,
                youtube: formData.youtube,
            })
            .eq("id", id);

        if (error) {
            setError("Failed to update creator. Please try again.");
            console.error("Error updating creator:", error);
            setSaving(false);
        } else {
            navigate(`/view/${id}`);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(`/view/${id}`)}
                sx={{ mb: 2 }}
            >
                Back to Creator
            </Button>

            <Typography variant="h4" component="h1" gutterBottom>
                Edit Creator
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Enter creator name"
                    sx={{
                        "& input::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                />

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Describe the creator and their content"
                    sx={{
                        "& textarea::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                />

                <TextField
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://example.com/image.jpg"
                    sx={{
                        "& input::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                />

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Social Media Links
                </Typography>

                <TextField
                    label="Instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://instagram.com/username"
                    sx={{
                        "& input::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <InstagramIcon color="secondary" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label="X (Twitter)"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://x.com/username"
                    sx={{
                        "& input::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <XIcon color="primary" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    label="YouTube"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://youtube.com/@channel"
                    sx={{
                        "& input::placeholder": {
                            color: "primary.main",
                            opacity: 0.7,
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <YouTubeIcon color="error" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/view/${id}`)}
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditCreator;
