import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fetchThreadDetails, createReply } from "../api/forumApi";
import type { ForumThreadDetails } from "../models/Forum";

const ThreadDetailsPage: React.FC = () => {
  const { id } = useParams();
  const threadId = Number(id);

  const [data, setData] = useState<ForumThreadDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [savingReply, setSavingReply] = useState(false);

  const loadDetails = async () => {
    if (!threadId) return;
    setLoading(true);
    setError(null);
    try {
      const details = await fetchThreadDetails(threadId);
      setData(details);
    } catch (e) {
      setError("Failed to load thread.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  const handleReply = async () => {
    if (!replyAuthor.trim() || !replyContent.trim()) {
      setError("Name and reply content are required.");
      return;
    }
    setError(null);
    setSavingReply(true);
    try {
      await createReply(threadId, {
        authorName: replyAuthor.trim(),
        content: replyContent.trim(),
      });
      setReplyAuthor("");
      setReplyContent("");
      await loadDetails();
    } catch (e) {
      setError("Failed to post reply.");
    } finally {
      setSavingReply(false);
    }
  };

  if (!threadId) {
    return <Typography color="error">Invalid thread id.</Typography>;
  }

  if (loading && !data) {
    return <Typography>Loading...</Typography>;
  }

  if (error && !data) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!data) {
    return null;
  }

  const { thread, replies } = data;

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {thread.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {thread.authorName} on {new Date(thread.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            {thread.content}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Replies ({replies.length})
      </Typography>
      <Stack spacing={2} mb={3}>
        {replies.map((reply) => (
          <Card key={reply.id}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {reply.authorName} -  {new Date(reply.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                {reply.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {replies.length === 0 && (
          <Typography color="text.secondary">No replies yet.</Typography>
        )}
      </Stack>

      <Typography variant="h6" gutterBottom>
        Add a Reply
      </Typography>
      <Stack spacing={2} maxWidth={600}>
        <TextField
          label="Your Name"
          value={replyAuthor}
          onChange={(e) => setReplyAuthor(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Reply"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          required
        />
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleReply}
          disabled={savingReply}
        >
          {savingReply ? "Posting..." : "Post Reply"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ThreadDetailsPage;
