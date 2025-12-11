import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Stack,
  Chip,
  Button
} from "@mui/material";
import { Event } from "../models/Event";
import { fetchEvent } from "../api/eventApi";

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEvent(Number(id))
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!event) {
    return <Typography>Not found</Typography>;
  }

  const handleCall = () => {
    if (!event.organizerPhone) return;
    window.location.href = `tel:${event.organizerPhone}`;
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4">{event.title}</Typography>
          <Chip label={event.type} color="primary" />
        </Stack>
        <Typography color="text.secondary">
          {event.city}, {event.state}
        </Typography>
        <Typography>
          Venue: {event.venue}
        </Typography>
        <Typography>
          When: {new Date(event.dateTime).toLocaleString()}
        </Typography>
        <Typography>{event.description}</Typography>
        <Typography>
          Organizer: {event.organizerName} • {event.organizerPhone}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleCall}>
            Call Organizer
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default EventDetailsPage;
