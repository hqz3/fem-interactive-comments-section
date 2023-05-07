import { User, CommentType } from "./App";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";
import { generateRespondElement } from "../utils/generateRespondElement";

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

    const replyButton = this.replyContainerEl.querySelector(
      ".comment__reply"
    ) as HTMLElement;

    if (replyButton) {
      replyButton.addEventListener("click", (e) => {
        if (this.replyPanel) return this.removeReplyPanel();

        const replyPanel = this.showReplyPanel();
        replyPanel.addEventListener("submit", (e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const text = target.text.value;
          this.addReply(text);
          this.removeReplyPanel();
        });
      });
    }
  }

  renderReply() {
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply
    );
  }

  showReplyPanel() {
    this.replyPanel = generateRespondElement(this.currentUser, "Reply");
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

  addReply(reply: string) {
    if (!reply.length) return;

    const newReply = {
      id: Date.now(),
      user: this.currentUser,
      createdAt: "Just now",
      content: reply,
      score: 0,
      replies: [],
    };

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
