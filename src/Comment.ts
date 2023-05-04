import { User, CommentType } from "./App";
import { Reply } from "./Reply";
import { generateCommentElement } from "../utils/generateCommentElement";

export class Comment {
  currentUser: User;
  comment: CommentType;
  commentEl: HTMLElement;
  repliesContainerEl: HTMLElement;

  constructor(currentUser: User, comment: CommentType) {
    this.currentUser = currentUser;
    this.comment = comment;

    this.commentEl = generateCommentElement(comment);

    // Create a container for replies that may or may be empty
    this.repliesContainerEl = document.createElement("div");
    this.repliesContainerEl.classList.add("replies__container");
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
