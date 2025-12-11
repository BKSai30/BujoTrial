import { useState } from "react";
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
  Divider,
} from "@mui/material";
import { fetchNearMe } from "../api/nearMeApi";
import type { NearMeResponse } from "../models/NearMe";
import { useNavigate } from "react-router-dom";

const NearMePage: React.FC = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NearMeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await fetchNearMe({
        city: city.trim(),
        state: state.trim() || undefined,
      });
      setData(result);
    } catch (e) {
      setError("Failed to load nearby data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Near Me
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "flex-end" }}
        mb={3}
      >
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Optional"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Near Me"}
        </Button>
      </Stack>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {data && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Results for {data.city}
            {data.state ? `, ${data.state}` : ""}
          </Typography>

          <SectionHeader title="Adoptions" count={data.adoptions.length} />
          <Grid container spacing={2} mb={3}>
            {data.adoptions.map((adoption) => (
              <Grid item xs={12} sm={6} md={4} key={adoption.id}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/adoptions/${adoption.id}`)}
                >
                  <CardContent>
                    <Typography variant="h6">{adoption.petName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {adoption.type} • {adoption.breed}
                    </Typography>
                    <Typography variant="body2">
                      {adoption.city}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <SectionHeader title="Blood Donors" count={data.donors.length} />
          <Grid container spacing={2} mb={3}>
            {data.donors.map((donor) => (
              <Grid item xs={12} sm={6} md={4} key={donor.id}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Chip label={donor.bloodGroup} color="error" />
                      <Typography variant="subtitle1">
                        {donor.animal} • {donor.breed}
                      </Typography>
                    </Stack>
                    <Typography variant="body2">
                      Owner: {donor.owner}
                    </Typography>
                    <Typography variant="body2">
                      {donor.city}, {donor.state}
                    </Typography>
                    <Typography variant="body2">
                      Age: {donor.age} yrs • {donor.weightKg} kg
                    </Typography>
                    <Typography variant="body2">
                      Phone: {donor.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <SectionHeader title="Emergencies" count={data.emergencies.length} />
          <Grid container spacing={2} mb={3}>
            {data.emergencies.map((emergency) => (
              <Grid item xs={12} sm={6} md={4} key={emergency.id}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/emergencies/${emergency.id}`)}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="h6">{emergency.title}</Typography>
                      <Chip label={emergency.animal} size="small" />
                    </Stack>
                    <Typography variant="body2">
                      {emergency.city}, {emergency.state}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {emergency.description}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Contact: {emergency.contactName} ({emergency.contactPhone})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <SectionHeader title="Events & Fundraisers" count={data.events.length} />
          <Grid container spacing={2} mb={3}>
            {data.events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="h6">{event.title}</Typography>
                      <Chip label={event.type} size="small" color="primary" />
                    </Stack>
                    <Typography variant="body2">
                      {event.city}, {event.state}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Venue: {event.venue}
                    </Typography>
                    <Typography variant="body2">
                      When: {new Date(event.dateTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Organizer: {event.organizerName} ({event.organizerPhone})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

interface SectionHeaderProps {
  title: string;
  count: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count }) => (
  <Box mb={1} mt={2}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="h6">{title}</Typography>
      <Chip label={count} size="small" />
    </Stack>
    <Divider sx={{ mt: 1 }} />
  </Box>
);

export default NearMePage;
