import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import CreatorCard from "../components/card";
import { supabase } from "../client";
import Footer from "../components/Footer";

const ShowCreators = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(`Failed to load creators: ${error.message}`);
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ margin: "0 auto", textAlign: "center" }}>
          Mary's Creatorverse
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add")}
          sx={{ marginLeft: "auto", color: "white", borderColor: "white" }}
        >
          Add Creator
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {creators.length === 0 && !error ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No creators yet. Add your first creator!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name}
              description={creator.description}
              image={creator.image}
              instagram={creator.instagram}
              twitter={creator.twitter}
              youtube={creator.youtube}
            />
          ))}
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default ShowCreators;
