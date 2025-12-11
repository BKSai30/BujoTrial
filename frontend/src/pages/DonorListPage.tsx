import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  Button,
  TextField
} from "@mui/material";
import { Donor } from "../models/Donor";
import { fetchDonors } from "../api/donorApi";

function DonorListPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");

  const load = () => {
    setLoading(true);
    fetchDonors({
      city: cityFilter || undefined,
      bloodGroup: bloodFilter || undefined
    })
      .then(setDonors)
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
        <Typography variant="h4">Blood Donors</Typography>
        <Button variant="contained" onClick={load}>
          Refresh
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
          label="Blood Group"
          value={bloodFilter}
          onChange={(e) => setBloodFilter(e.target.value)}
        />
        <Button variant="outlined" onClick={load}>
          Apply Filters
        </Button>
        <Button
          variant="contained"
          color="secondary"
          href="/donors/new"
        >
          Add Donor
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {donors.map((d) => (
          <Grid item xs={12} sm={6} md={4} key={d.id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: "error.main", width: 56, height: 56 }}>
                      {d.bloodGroup}
                    </Avatar>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">
                        {d.breed} - {d.animal}
                      </Typography>
                      <Typography color="text.secondary">
                        By {d.owner}
                      </Typography>
                      <Typography color="text.secondary">
                        {d.city}, {d.state}
                      </Typography>
                      <Typography color="text.secondary">
                        Age {d.age} • {d.weightKg} Kg
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {donors.length === 0 && (
          <Grid item xs={12}>
            <Typography>No donors found. Add the first donor.</Typography>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}

export default DonorListPage;
