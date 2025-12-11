import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createThread } from "../api/forumApi";

const CreateThreadPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !authorName.trim() || !content.trim()) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const thread = await createThread({
        title: title.trim(),
        authorName: authorName.trim(),
        content: content.trim(),
      });
      navigate(/forum/);
    } catch (e) {
      setError("Failed to create thread.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Thread
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Your Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          minRows={4}
          required
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
            {saving ? "Posting..." : "Post Thread"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/forum")}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateThreadPage;
