import { User, CommentType } from "../src/App";

export const generateCommentElements = (
  currentUser: User,
  comment: CommentType
) => {
  const isCurrentUser = currentUser.username === comment.user.username;

  const youSpan = `<span class="comment__you">you</span>`;

  const userDeleteButton = `
    <div class="comment__delete">
      <img src="images/icon-delete.svg" alt="Delete" />
      <button class="comment__delete-button" aria-label="Delete">Delete</button>
    </div>`;

  const userEditButton = `
    <div class="comment__edit">
      <img src="images/icon-edit.svg" alt="Edit" />
      <button class="comment__edit-button" aria-label="Edit">Edit</button>
    </div>`;

  const userOptions = `
    <div class="comment__options">
      ${userDeleteButton}
      ${userEditButton}
    </div>`;

  const userReplyButton = `
    <div class="comment__reply">
      <img src="images/icon-reply.svg" alt="Reply" />
      <button class="comment__reply-button" aria-label="Reply">Reply</button>
    </div>`;

  return `
    <div class="comment__user">
      <img
        class="comment__user-image"
        src="${comment.user.image.png}"
        alt="${comment.user.username}"
      />
      <span class="comment__username">${comment.user.username}</span>
      ${isCurrentUser ? youSpan : ""}
      <span class="comment__createdAt">${comment.createdAt}</span>
    </div>
    <p class="comment__text">${comment.content}</p>
    <div class="comment__vote">
      <button class="vote__upvote" aria-label="Upvote">+</button>
      <span class="vote__score" aria-label="Score">
        ${comment.score}
      </span>
      <button class="vote__downvote" aria-label="Downvote">-</button>
    </div>
    ${isCurrentUser ? userOptions : userReplyButton}
  `;
};
