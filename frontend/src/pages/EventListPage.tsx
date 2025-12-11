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
import { Event } from "../models/Event";
import { fetchEvents } from "../api/eventApi";

function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    fetchEvents({
      city: cityFilter || undefined,
      state: stateFilter || undefined,
      upcomingOnly
    })
      .then(setEvents)
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
        <Typography variant="h4">Events & Fundraisers</Typography>
        <Button variant="contained" onClick={() => navigate("/events/new")}>
          Create Event
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
        <Button
          variant={upcomingOnly ? "contained" : "outlined"}
          color="secondary"
          onClick={() => {
            setUpcomingOnly(!upcomingOnly);
            setTimeout(load, 0);
          }}
        >
          {upcomingOnly ? "Showing Upcoming" : "Showing All"}
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {events.map((e) => (
          <Grid item xs={12} md={6} key={e.id}>
            <Card>
              <CardActionArea onClick={() => navigate(/events/)}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{e.title}</Typography>
                      <Chip label={e.type} color="primary" size="small" />
                    </Stack>
                    <Typography color="text.secondary">
                      {e.city}, {e.state}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {e.description}
                    </Typography>
                    <Typography variant="body2">
                      Venue: {e.venue}
                    </Typography>
                    <Typography variant="body2">
                      When: {new Date(e.dateTime).toLocaleString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {events.length === 0 && (
          <Grid item xs={12}>
            <Typography>No events found.</Typography>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}

export default EventListPage;
