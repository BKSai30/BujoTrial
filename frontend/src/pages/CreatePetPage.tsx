import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createPet } from "../api/profileApi";

const SPECIES_OPTIONS = ["Dog", "Cat", "Other"];

const CreatePetPage: React.FC = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Dog");
  const [breed, setBreed] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        species: species,
        breed: breed.trim(),
        ageYears: ageYears ? Number(ageYears) : null,
        weightKg: weightKg ? Number(weightKg) : null,
        notes: notes.trim(),
      };
      await createPet(payload);
      navigate("/pets");
    } catch (e) {
      setError("Failed to create pet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Pet
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          fullWidth
        >
          {SPECIES_OPTIONS.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          fullWidth
        />
        <TextField
          label="Age (years)"
          value={ageYears}
          onChange={(e) => setAgeYears(e.target.value)}
          fullWidth
        />
        <TextField
          label="Weight (kg)"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          fullWidth
        />
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Pet"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/pets")}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreatePetPage;
