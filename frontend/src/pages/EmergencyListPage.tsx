import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Button,
  TextField,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Emergency } from "../models/Emergency";
import { fetchEmergencies } from "../api/emergencyApi";

function EmergencyListPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    fetchEmergencies({
      city: cityFilter || undefined,
      state: stateFilter || undefined
    })
      .then(setEmergencies)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h4">Emergency Help</Typography>
        <Button variant="contained" color="error" onClick={() => navigate("/emergencies/new")}>
          Create Emergency
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <TextField
          size="small"
          label="City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />
        <TextField
          size="small"
          label="State"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        />
        <Button variant="outlined" onClick={load}>
          Apply Filters
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {emergencies.map((e) => (
          <Grid item xs={12} md={6} key={e.id}>
            <Card>
              <CardActionArea onClick={() => navigate(/emergencies/)}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{e.title}</Typography>
                      <Chip label={e.animal} color="error" size="small" />
                    </Stack>
                    <Typography color="text.secondary">
                      {e.city}, {e.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {e.description}
                    </Typography>
                    <Typography variant="body2">
                      Contact: {e.contactName} • {e.contactPhone}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {emergencies.length === 0 && (
          <Grid item xs={12}>
            <Typography>No emergencies posted yet.</Typography>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}

export default EmergencyListPage;
