import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createClinic } from "../api/clinicApi";

const CreateClinicPage: React.FC = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !city.trim() || !state.trim() || !address.trim() || !phone.trim()) {
      setError("Name, city, state, address and phone are required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const clinic = await createClinic({
        name: name.trim(),
        city: city.trim(),
        state: state.trim(),
        address: address.trim(),
        phone: phone.trim(),
        openingHours: openingHours.trim(),
        emergencyAvailable,
      });
      navigate(/clinics/);
    } catch (e) {
      setError("Failed to create clinic.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Clinic
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Clinic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          required
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Opening Hours"
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
          fullWidth
          placeholder="e.g. 9am - 9pm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={emergencyAvailable}
              onChange={(e) => setEmergencyAvailable(e.target.checked)}
            />
          }
          label="Emergency services available (24x7)"
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
            {saving ? "Saving..." : "Save Clinic"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/clinics")}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateClinicPage;
