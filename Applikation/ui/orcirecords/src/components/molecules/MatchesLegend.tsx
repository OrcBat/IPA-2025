import { Box, Chip } from "@mui/material";

const MatchesLegend = () => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Chip
          label="Partial Match"
          sx={{ backgroundColor: "#faf8d2", border: "1px solid #000000" }}
        />
        <Chip
          label="Perfect Match"
          sx={{ backgroundColor: "#d9fae2", border: "1px solid #000000" }}
        />
      </Box>
    </Box>
  );
};

export default MatchesLegend;
