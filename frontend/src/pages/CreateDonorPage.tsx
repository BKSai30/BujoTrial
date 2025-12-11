import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { createDonor } from "../api/donorApi";
import { Donor } from "../models/Donor";

function CreateDonorPage() {
  const [form, setForm] = useState<Donor>({
    animal: "",
    breed: "",
    owner: "",
    city: "",
    state: "",
    age: "",
    bloodGroup: "",
    weightKg: 0,
    phone: ""
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "weightKg" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createDonor(form);
      navigate("/donors");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Add Blood Donor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="animal"
            label="Animal (Dog, Cat, Cow...)"
            value={form.animal}
            onChange={handleChange}
            required
          />
          <TextField
            name="breed"
            label="Breed"
            value={form.breed}
            onChange={handleChange}
            required
          />
          <TextField
            name="owner"
            label="Owner Name"
            value={form.owner}
            onChange={handleChange}
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              name="city"
              label="City"
              value={form.city}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="state"
              label="State"
              value={form.state}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              name="age"
              label="Age (e.g. 3 yrs)"
              value={form.age}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="weightKg"
              label="Weight (Kg)"
              type="number"
              value={form.weightKg}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
          <TextField
            name="bloodGroup"
            label="Blood Group"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          />
          <TextField
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save Donor"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default CreateDonorPage;
