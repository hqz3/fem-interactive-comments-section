import { User, CommentType } from "./App";
import { Reply } from "./Reply";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";

export class Comment {
  currentUser: User;
  comment: CommentType;
  vote: -1 | 0 | 1;

  commentEl: HTMLElement;
  commentContainerEl: HTMLElement;
  repliesContainerEl: HTMLElement;

  constructor(currentUser: User, comment: CommentType) {
    this.currentUser = currentUser;
    this.comment = comment;
    this.vote = 0;

    this.commentEl = createElement("comment");
    this.commentContainerEl = createElement("comment__container");
    this.repliesContainerEl = createElement("replies__container");

    this.renderUserComment();

    this.commentContainerEl.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("vote__upvote") && this.vote <= 0) {
        this.comment.score += 1;
        this.vote += 1;
        this.renderUserComment();
      } else if (
        target.classList.contains("vote__downvote") &&
        this.vote >= 0
      ) {
        this.comment.score -= 1;
        this.vote -= 1;
        this.renderUserComment();
      }
    });

    this.commentEl.appendChild(this.commentContainerEl);
    this.commentEl.appendChild(this.repliesContainerEl);

    this.loadReplies();
  }

  loadReplies() {
    this.comment.replies?.map((reply) => {
      const node = new Reply(this.currentUser, reply);
      this.repliesContainerEl.appendChild(node.replyEl);
    });
  }

  renderUserComment() {
    this.commentContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment
    );
  }
}
