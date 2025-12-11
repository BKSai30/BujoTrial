import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { fetchReminders, updateReminderStatus, deleteReminder } from "../api/reminderApi";
import type { Reminder } from "../models/Reminder";

const ReminderListPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [petNameFilter, setPetNameFilter] = useState("");
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  const navigate = useNavigate();

  const loadReminders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReminders({
        upcomingOnly,
        petName: petNameFilter.trim() || undefined,
      });
      setReminders(data);
    } catch (e) {
      setError("Failed to load reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleCompleted = async (reminder: Reminder) => {
    try {
      const updated = await updateReminderStatus(reminder.id, { completed: !reminder.completed });
      setReminders((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
    } catch (e) {
      setError("Failed to update reminder.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setError("Failed to delete reminder.");
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3} alignItems={{ xs: "stretch", sm: "flex-end" }}>
        <TextField
          label="Pet Name"
          value={petNameFilter}
          onChange={(e) => setPetNameFilter(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={upcomingOnly}
              onChange={(e) => setUpcomingOnly(e.target.checked)}
            />
          }
          label={upcomingOnly ? "Showing Upcoming" : "Showing All Active"}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={loadReminders}
          disabled={loading}
        >
          {loading ? "Loading..." : "Apply Filters"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/reminders/new")}
        >
          New Reminder
        </Button>
      </Stack>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Stack spacing={2}>
        {reminders.map((reminder) => {
          const due = new Date(reminder.dueDateTime);
          const isPast = !reminder.completed && due.getTime() < Date.now();
          return (
            <Card key={reminder.id}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6">{reminder.title}</Typography>
                    {reminder.type && (
                      <Chip label={reminder.type} size="small" color="primary" />
                    )}
                    {isPast && (
                      <Chip label="Overdue" size="small" color="error" />
                    )}
                  </Stack>
                  <Chip
                    label={reminder.completed ? "Completed" : "Pending"}
                    color={reminder.completed ? "success" : "warning"}
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Pet: {reminder.petName || "N/A"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Due: {due.toLocaleString()}
                </Typography>
                {reminder.description && (
                  <Typography variant="body2" gutterBottom>
                    {reminder.description}
                  </Typography>
                )}
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleToggleCompleted(reminder)}
                  >
                    {reminder.completed ? "Mark as Pending" : "Mark as Done"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(reminder.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
        {!loading && reminders.length === 0 && !error && (
          <Typography color="text.secondary">
            No reminders yet. Create one to get started.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ReminderListPage;
