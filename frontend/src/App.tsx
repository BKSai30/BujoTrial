import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import AdoptionListPage from "./pages/AdoptionListPage";
import CreateAdoptionPage from "./pages/CreateAdoptionPage";
import AdoptionDetailsPage from "./pages/AdoptionDetailsPage";
import DonorListPage from "./pages/DonorListPage";
import CreateDonorPage from "./pages/CreateDonorPage";
import EmergencyListPage from "./pages/EmergencyListPage";
import CreateEmergencyPage from "./pages/CreateEmergencyPage";
import EmergencyDetailsPage from "./pages/EmergencyDetailsPage";
import EventListPage from "./pages/EventListPage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import NearMePage from "./pages/NearMePage";
import ForumListPage from "./pages/ForumListPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import ThreadDetailsPage from "./pages/ThreadDetailsPage";
import ClinicListPage from "./pages/ClinicListPage";
import CreateClinicPage from "./pages/CreateClinicPage";
import ClinicDetailsPage from "./pages/ClinicDetailsPage";
import ReminderListPage from "./pages/ReminderListPage";
import ProfilePage from "./pages/ProfilePage";
import PetListPage from "./pages/PetListPage";
import CreatePetPage from "./pages/CreatePetPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import { fetchUserProfile } from "./api/profileApi";
import type { UserProfile } from "./models/Profile";

// helper: first letter of name or "U"
function getInitialFromName(name: string | undefined | null): string {
  if (!name) {
    return "U";
  }
  const trimmed = name.trim();
  if (!trimmed) {
    return "U";
  }
  return trimmed.charAt(0).toUpperCase();
}

function AppInner() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        if (data) {
          setProfile(data);
        }
      } catch {
        // fail silently for avatar
      }
    };
    loadProfile();
  }, []);

  const avatarInitial = getInitialFromName(profile?.name);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bujo Pet Care
          </Typography>
          <Button color="inherit" component={Link} to="/adoptions">
            Adoptions
          </Button>
          <Button color="inherit" component={Link} to="/donors">
            Blood Donors
          </Button>
          <Button color="inherit" component={Link} to="/emergencies">
            Emergencies
          </Button>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/near-me">
            Near Me
          </Button>
          <Button color="inherit" component={Link} to="/forum">
            Forum
          </Button>
          <Button color="inherit" component={Link} to="/clinics">
            Clinics
          </Button>
          <Button color="inherit" component={Link} to="/reminders">
            Reminders
          </Button>
          <Button color="inherit" component={Link} to="/pets">
            My Pets
          </Button>
          <IconButton
            color="inherit"
            onClick={() => navigate("/profile")}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}>
              {avatarInitial}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/adoptions" />} />

          <Route path="/adoptions" element={<AdoptionListPage />} />
          <Route path="/adoptions/new" element={<CreateAdoptionPage />} />
          <Route path="/adoptions/:id" element={<AdoptionDetailsPage />} />

          <Route path="/donors" element={<DonorListPage />} />
          <Route path="/donors/new" element={<CreateDonorPage />} />

          <Route path="/emergencies" element={<EmergencyListPage />} />
          <Route path="/emergencies/new" element={<CreateEmergencyPage />} />
          <Route path="/emergencies/:id" element={<EmergencyDetailsPage />} />

          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/new" element={<CreateEventPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />

          <Route path="/near-me" element={<NearMePage />} />

          <Route path="/forum" element={<ForumListPage />} />
          <Route path="/forum/new" element={<CreateThreadPage />} />
          <Route path="/forum/:id" element={<ThreadDetailsPage />} />

          <Route path="/clinics" element={<ClinicListPage />} />
          <Route path="/clinics/new" element={<CreateClinicPage />} />
          <Route path="/clinics/:id" element={<ClinicDetailsPage />} />

          <Route path="/reminders" element={<ReminderListPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pets" element={<PetListPage />} />
          <Route path="/pets/new" element={<CreatePetPage />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default AppInner;
