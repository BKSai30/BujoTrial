import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { fetchClinic } from "../api/clinicApi";
import type { VetClinic } from "../models/Clinic";

const ClinicDetailsPage: React.FC = () => {
  const { id } = useParams();
  const clinicId = Number(id);

  const [clinic, setClinic] = useState<VetClinic | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!clinicId) {
        setError("Invalid clinic id.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchClinic(clinicId);
        setClinic(data);
      } catch (e) {
        setError("Failed to load clinic.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [clinicId]);

  if (loading && !clinic) {
    return <Typography>Loading...</Typography>;
  }

  if (error && !clinic) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!clinic) {
    return null;
  }

  const handleCall = () => {
    if (clinic.phone) {
      window.location.href = `tel:${clinic.phone}`;
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h5">{clinic.name}</Typography>
            {clinic.emergencyAvailable && (
              <Chip label="Emergency 24x7" color="error" />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {clinic.city}, {clinic.state}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {clinic.address}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Opening Hours: {clinic.openingHours}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: {clinic.phone}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCall}
          >
            Call Clinic
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClinicDetailsPage;
