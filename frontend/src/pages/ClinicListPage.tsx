import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fetchClinics } from "../api/clinicApi";
import type { VetClinic } from "../models/Clinic";

const ClinicListPage: React.FC = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [clinics, setClinics] = useState<VetClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadClinics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClinics({
        city: city.trim() || undefined,
        state: state.trim() || undefined,
      });
      setClinics(data);
    } catch (e) {
      setError("Failed to load clinics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClinics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3} alignItems={{ xs: "stretch", sm: "flex-end" }}>
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={loadClinics}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Clinics"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/clinics/new")}
        >
          Add Clinic
        </Button>
      </Stack>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        {clinics.map((clinic) => (
          <Grid item xs={12} sm={6} md={4} key={clinic.id}>
            <Card
              sx={{ cursor: "pointer" }}
              component={RouterLink}
              to={/clinics/}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6">{clinic.name}</Typography>
                  {clinic.emergencyAvailable && (
                    <Chip label="Emergency 24x7" color="error" size="small" />
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {clinic.city}, {clinic.state}
                </Typography>
                <Typography variant="body2" noWrap>
                  {clinic.address}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Hours: {clinic.openingHours}
                </Typography>
                <Typography variant="body2">
                  Phone: {clinic.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {!loading && clinics.length === 0 && !error && (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              No clinics found. Try adjusting filters or add one.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ClinicListPage;
