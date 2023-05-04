import { CommentType } from "../src/App";

export const generateCommentElement = (comment: CommentType) => {
  const element = document.createElement("div") as HTMLElement;
  element.classList.add("comment");

  element.innerHTML = `
        <div class="comment__user">
          <img
            class="comment__user-image"
            src=${comment.user.image.png}
            alt=${comment.user.username}
          />
          <span class="comment__username">${comment.user.username}</span>
          <span class="comment__createdAt">${comment.createdAt}</span>
        </div>
        <p class="comment__text">
          ${comment.content}
        </p>
        <div class="vote">
          <button class="vote__upvote" aria-label='Upvote'>+</button>
          <span class="vote__score" aria-label='Score'>${comment.score}</span>
          <button class="vote__downvote" aria-label='Downvote'>-</button>
        </div>
        <div class="reply">
          <img src="images/icon-reply.svg" alt="Reply" />
          <button class="reply__button" aria-label='Reply'>Reply</button>
        </div>
  `;

  return element;
};