import { User, CommentType } from "./App";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";

export class Reply {
  currentUser: User;
  reply: CommentType;
  replyEl: HTMLElement;
  replyContainerEl: HTMLElement;
  vote: -1 | 0 | 1;

  constructor(currentUser: User, reply: CommentType) {
    this.currentUser = currentUser;
    this.reply = reply;
    this.vote = 0;

    this.replyEl = createElement("comment", "reply");
    this.replyContainerEl = createElement("comment__container");
    this.renderReply();

    this.replyContainerEl.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("vote__upvote") && this.vote <= 0) {
        this.reply.score += 1;
        this.vote += 1;
        this.renderReply();
      } else if (
        target.classList.contains("vote__downvote") &&
        this.vote >= 0
      ) {
        this.reply.score -= 1;
        this.vote -= 1;
        this.renderReply();
      }
    });

    this.replyEl.appendChild(this.replyContainerEl);
  }

  renderReply() {
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply
    );
  }
}
