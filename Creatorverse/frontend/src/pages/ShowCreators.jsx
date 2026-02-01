import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreatorCard from "../components/card";
import { creators } from "../data/creators";

const ShowCreators = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
         Mary's Creatorverse
      </Typography>
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
          />
        ))}
      </Box>
    </Box>
  );
};

export default ShowCreators;
