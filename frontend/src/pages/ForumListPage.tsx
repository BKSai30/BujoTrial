import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { fetchThreads } from "../api/forumApi";
import type { ForumThread } from "../models/Forum";

const ForumListPage: React.FC = () => {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchThreads();
        setThreads(data);
      } catch (e) {
        setError("Failed to load threads.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Forum</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/forum/new")}>
          New Thread
        </Button>
      </Stack>

      {loading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Stack spacing={2}>
        {threads.map((thread) => (
          <Card
            key={thread.id}
            sx={{ cursor: "pointer" }}
            component={RouterLink}
            to={`/forum/${thread.id}`}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {thread.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By {thread.authorName} on {new Date(thread.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" noWrap>
                {thread.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {!loading && threads.length === 0 && !error && (
          <Typography color="text.secondary">No threads yet. Be the first to post!</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ForumListPage;
