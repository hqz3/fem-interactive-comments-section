import { User, CommentType } from "../src/App";

type Options = {
  isReply?: boolean;
  isEditing?: boolean;
};

export const generateCommentElements = (
  currentUser: User,
  comment: CommentType,
  options: Options = {}
) => {
  const { isReply, isEditing } = options;
  const isCurrentUser = currentUser.username === comment.user.username;

  const youSpan = `<span class="comment__you">you</span>`;
  console.log("herees");
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

  const commentText = `<p class="comment__text">${comment.content}</p>`;
  const replyText = `
    <p class="comment__text">
      <span class="comment__replying-to">@${comment.replyingTo}</span> ${comment.content}
    </p>`;

  const editTextarea = `
    <textarea
      class="respond__textarea edit__textarea"
      name="text"
      placeholder="Add a comment...">${comment.content}</textarea>`;

  const updateButton = `
    <button class="respond__button update__button" type="submit" aria-label=Update>
      Update
    </button>`;

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
    ${isEditing ? editTextarea : isReply ? replyText : commentText}
    <div class="comment__vote">
      <button class="vote__upvote" aria-label="Upvote">+</button>
      <span class="vote__score" aria-label="Score">${comment.score}</span>
      <button class="vote__downvote" aria-label="Downvote">-</button>
    </div>
    ${!isEditing ? (isCurrentUser ? userOptions : userReplyButton) : ""}
    ${isEditing ? updateButton : ""}
  `;
};
