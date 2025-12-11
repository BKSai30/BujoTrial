export interface ForumThread {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface ForumReply {
  id: number;
  content: string;
  authorName: string;
  createdAt: string;
  thread?: ForumThread;
}

export interface ForumThreadDetails {
  thread: ForumThread;
  replies: ForumReply[];
}
