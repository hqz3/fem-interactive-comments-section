import { User, CommentType } from "./App";
import { Reply } from "./Reply";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";

export class Comment {
  currentUser: User;
  comment: CommentType;
  upvoted: boolean;
  downvoted: boolean;

  commentEl: HTMLElement;
  commentContainerEl: HTMLElement;
  repliesContainerEl: HTMLElement;

  constructor(currentUser: User, comment: CommentType) {
    this.currentUser = currentUser;
    this.comment = comment;
    this.upvoted = false;
    this.downvoted = false;

    this.commentEl = createElement("comment");
    this.commentContainerEl = createElement("comment__container");
    this.repliesContainerEl = createElement("replies__container");

    this.commentContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment
    );

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
}
