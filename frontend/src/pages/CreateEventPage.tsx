import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { createEvent } from "../api/eventApi";
import { Event } from "../models/Event";

function CreateEventPage() {
  const [form, setForm] = useState<Event>({
    title: "",
    description: "",
    type: "",
    city: "",
    state: "",
    venue: "",
    dateTime: new Date().toISOString().slice(0, 16),
    organizerName: "",
    organizerPhone: ""
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "dateTime" ? value : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        dateTime: new Date(form.dateTime).toISOString()
      };
      await createEvent(payload);
      navigate("/events");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Create Event / Fundraiser
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
          <TextField
            name="type"
            label="Type (e.g. Fundraiser, Adoption Camp)"
            value={form.type}
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
          <TextField
            name="venue"
            label="Venue"
            value={form.venue}
            onChange={handleChange}
            required
          />
          <TextField
            name="dateTime"
            type="datetime-local"
            label="Date & Time"
            value={form.dateTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
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
              name="organizerName"
              label="Organizer Name"
              value={form.organizerName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="organizerPhone"
              label="Organizer Phone"
              value={form.organizerPhone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save Event"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default CreateEventPage;
