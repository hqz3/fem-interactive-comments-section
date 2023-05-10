import { User, CommentType } from "../src/App";

export const generateNewReply = (
  currentUser: User,
  content: string,
  replyingTo?: string
): CommentType => {
  return {
    id: Date.now(),
    user: currentUser,
    createdAt: "Just now",
    content,
    score: 0,
    replies: [],
    replyingTo,
  };
};
