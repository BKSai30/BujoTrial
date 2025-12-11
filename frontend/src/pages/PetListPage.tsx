import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { fetchPets, deletePet } from "../api/profileApi";
import type { Pet } from "../models/Profile";

const PetListPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPets();
      setPets(data);
    } catch (e) {
      setError("Failed to load pets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError("Failed to delete pet.");
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Pets</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/pets/new")}>
          Add Pet
        </Button>
      </Stack>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <Card
              sx={{ cursor: "pointer" }}
              component={RouterLink}
              to={"/pets/" + pet.id}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {pet.species} {pet.breed ? "• " + pet.breed : ""}
                </Typography>
                <Typography variant="body2">
                  {pet.ageYears != null ? "Age: " + pet.ageYears + " yrs" : ""}
                  {pet.weightKg != null ? "   Weight: " + pet.weightKg + " kg" : ""}
                </Typography>
                {pet.notes && (
                  <Typography variant="body2" noWrap>
                    {pet.notes}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(pet.id);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {!loading && pets.length === 0 && !error && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No pets yet. Add your first pet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PetListPage;
