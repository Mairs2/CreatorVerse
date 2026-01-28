import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreatorCard from "../components/card";

const creators = [
  {
    id: 1,
    name: "Tech Wizard",
    description: "Creating tutorials on web development and programming",
    image: "https://picsum.photos/seed/creator1/345/140",
  },
  {
    id: 2,
    name: "Gaming Pro",
    description: "Professional gamer streaming daily gameplay and tips",
    image: "https://picsum.photos/seed/creator2/345/140",
  },
  {
    id: 3,
    name: "Fitness Guru",
    description: "Sharing workout routines and healthy lifestyle content",
    image: "https://picsum.photos/seed/creator3/345/140",
  },
  {
    id: 4,
    name: "Art Master",
    description: "Digital artist creating amazing illustrations and tutorials",
    image: "https://picsum.photos/seed/creator4/345/140",
  },
  {
    id: 5,
    name: "Music Maker",
    description: "Musician producing original beats and covers",
    image: "https://picsum.photos/seed/creator5/345/140",
  },
];

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
