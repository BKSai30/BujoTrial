import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { createEmergency } from "../api/emergencyApi";
import { Emergency } from "../models/Emergency";

function CreateEmergencyPage() {
  const [form, setForm] = useState<Emergency>({
    title: "",
    description: "",
    animal: "",
    city: "",
    state: "",
    contactName: "",
    contactPhone: ""
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createEmergency(form);
      navigate("/emergencies");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Create Emergency
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              name="animal"
              label="Animal"
              value={form.animal}
              onChange={handleChange}
              required
              fullWidth
            />
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
          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <Stack direction="row" spacing={2}>
            <TextField
              name="contactName"
              label="Contact Name"
              value={form.contactName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="contactPhone"
              label="Contact Phone"
              value={form.contactPhone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
          <Button type="submit" variant="contained" color="error" disabled={saving}>
            {saving ? "Posting..." : "Post Emergency"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default CreateEmergencyPage;
