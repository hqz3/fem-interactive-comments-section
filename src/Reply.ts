import { User, CommentType } from "./App";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";
import { generateRespondElement } from "../utils/generateRespondElement";
import { generateNewReply } from "../utils/generateNewReply";

export class Reply {
  currentUser: User;
  reply: CommentType;
  replyEl: HTMLElement;
  replyPanel: HTMLElement | null;
  replyContainerEl: HTMLElement;
  vote: -1 | 0 | 1;

  constructor(currentUser: User, reply: CommentType) {
    this.currentUser = currentUser;
    this.reply = reply;
    this.vote = 0;
    this.replyPanel = null;

    this.replyEl = createElement("comment", "reply");
    this.replyContainerEl = createElement("comment__container");
    this.replyEl.appendChild(this.replyContainerEl);

    this.renderReply();

    this.replyContainerEl.addEventListener("click", (e: Event) => {
      e.stopPropagation();

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
      } else if (target.classList.contains("comment__reply")) {
        if (this.replyPanel) return this.removeReplyPanel();

        const replyPanel = this.showReplyPanel();
        replyPanel.addEventListener("submit", (e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const text = target.text.value;
          this.addSubReply(text);
          this.removeReplyPanel();
        });
      }
    });
  }

  renderReply() {
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply
    );
  }

  showReplyPanel() {
    this.replyPanel = generateRespondElement(
      this.currentUser,
      "Reply",
      this.reply
    );
    this.replyPanel.classList.add("slideDown");
    this.replyContainerEl.insertAdjacentElement("afterend", this.replyPanel);
    return this.replyPanel;
  }

  removeReplyPanel() {
    if (this.replyPanel) {
      this.replyPanel.remove();
      this.replyPanel = null;
    }
  }

  addSubReply(reply: string) {
    if (!reply.length) return;
    const newReply = generateNewReply(this.currentUser, reply);
    const instance = new Reply(this.currentUser, newReply);

    if (this.replyEl && this.replyEl.parentNode) {
      (this.replyEl.parentNode as HTMLElement).insertAdjacentElement(
        "beforeend",
        instance.replyEl
      );
      instance.replyEl.classList.add("slideDown");

      setTimeout(() => {
        instance.replyEl.classList.remove("slideDown");
      }, 500);
    }
  }
}
