import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { fetchPet } from "../api/profileApi";
import type { Pet } from "../models/Profile";

const PetDetailsPage: React.FC = () => {
  const { id } = useParams();
  const petId = Number(id);

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!petId) {
        setError("Invalid pet id.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPet(petId);
        setPet(data);
      } catch (e) {
        setError("Failed to load pet.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [petId]);

  if (loading && !pet) {
    return <Typography>Loading...</Typography>;
  }

  if (error && !pet) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pet) {
    return null;
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {pet.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {pet.species} {pet.breed ? "• " + pet.breed : ""}
          </Typography>
          <Stack spacing={0.5} mt={1}>
            {pet.ageYears != null && (
              <Typography variant="body2">
                Age: {pet.ageYears} years
              </Typography>
            )}
            {pet.weightKg != null && (
              <Typography variant="body2">
                Weight: {pet.weightKg} kg
              </Typography>
            )}
            {pet.notes && (
              <Typography variant="body2">
                Notes: {pet.notes}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetDetailsPage;
