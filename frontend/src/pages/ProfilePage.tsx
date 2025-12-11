import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { fetchUserProfile, saveUserProfile } from "../api/profileApi";
import type { UserProfile } from "../models/Profile";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUserProfile();
        if (data) {
          setProfile(data);
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setCity(data.city || "");
          setState(data.state || "");
        }
      } catch (e) {
        setError("Failed to load profile.");
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim(),
      };
      const saved = await saveUserProfile(payload);
      setProfile(saved);
    } catch (e) {
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = (profile?.name || name || "U")
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}>
          {initials}
        </Avatar>
        <Typography variant="h4">My Profile</Typography>
      </Stack>

      {profile && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile summary
            </Typography>
            <Typography variant="body2">
              Name: {profile.name || "-"}
            </Typography>
            <Typography variant="body2">
              Email: {profile.email || "-"}
            </Typography>
            <Typography variant="body2">
              Phone: {profile.phone || "-"}
            </Typography>
            <Typography variant="body2">
              Location: {profile.city || "-"}, {profile.state || "-"}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="h6" gutterBottom>
        Edit details
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          fullWidth
        />
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
