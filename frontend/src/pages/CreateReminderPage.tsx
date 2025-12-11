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
import { createReminder } from "../api/reminderApi";

const REMINDER_TYPES = [
  "VET_VISIT",
  "VACCINATION",
  "GROOMING",
  "MEDICATION",
  "OTHER",
];

function toLocalInputValue(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return ${year}--T:;
}

const CreateReminderPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("OTHER");
  const [dueDateTime, setDueDateTime] = useState(toLocalInputValue(new Date()));
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const isoDue = new Date(dueDateTime).toISOString();
      await createReminder({
        title: title.trim(),
        description: description.trim(),
        type,
        petName: petName.trim(),
        dueDateTime: isoDue,
      });
      navigate("/reminders");
    } catch (e) {
      setError("Failed to create reminder.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Reminder
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
        >
          {REMINDER_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Due Date & Time"
          type="datetime-local"
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Reminder"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/reminders")}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateReminderPage;
