import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Stack,
  Chip,
  Button
} from "@mui/material";
import { Emergency } from "../models/Emergency";
import { fetchEmergency } from "../api/emergencyApi";

function EmergencyDetailsPage() {
  const { id } = useParams();
  const [emergency, setEmergency] = useState<Emergency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEmergency(Number(id))
      .then(setEmergency)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!emergency) {
    return <Typography>Not found</Typography>;
  }

  const handleCall = () => {
    window.location.href = `tel:${emergency.contactPhone}`;
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4">{emergency.title}</Typography>
          <Chip label={emergency.animal} color="error" />
        </Stack>
        <Typography color="text.secondary">
          {emergency.city}, {emergency.state}
        </Typography>
        <Typography>{emergency.description}</Typography>
        <Typography>
          Contact: {emergency.contactName} • {emergency.contactPhone}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={handleCall}>
            Call
          </Button>
          {/* Future: Chat button */}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default EmergencyDetailsPage;
