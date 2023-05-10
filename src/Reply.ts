import { Post } from "./Post";
import { User, CommentType } from "./App";

export class Reply extends Post {
  replyEl: HTMLElement;
  replyContainerEl: HTMLElement;

  constructor(currentUser: User, reply: CommentType) {
    super(currentUser, reply);

    this.replyEl = this.createDivElement("comment", "reply");
    this.replyContainerEl = this.createDivElement("comment__container");

    this.replyEl.appendChild(this.replyContainerEl);
    this.renderComment(this.replyContainerEl, true);

    this.replyContainerEl.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (target.classList.contains("vote__upvote") && this.vote <= 0) {
        this.handleVote(1);
        this.renderComment(this.replyContainerEl, true);
      } else if (
        target.classList.contains("vote__downvote") &&
        this.vote >= 0
      ) {
        this.handleVote(-1);
        this.renderComment(this.replyContainerEl, true);
      } else if (target.classList.contains("comment__reply")) {
        if (this.replyPanel) return this.removeReplyPanel();
        this.showReplyPanel();
      } else if (target.classList.contains("comment__delete")) {
        this.showDeleteModal(target);
      } else if (target.classList.contains("comment__edit")) {
        this.renderUpdatePanel(this.replyContainerEl);
      } else if (target.classList.contains("update__button")) {
        const textArea = this.replyContainerEl.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;
        this.comment.content = textArea?.value || "";
        this.renderComment(this.replyContainerEl, true);
      }
    });
  }

  showReplyPanel() {
    this.generateReplyPanel();
    if (this.replyPanel) {
      this.replyContainerEl.insertAdjacentElement("afterend", this.replyPanel);

      // Add a new reply
      this.replyPanel.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = (e.target as HTMLFormElement).text.value;
        this.addSubReply(text);
        this.removeReplyPanel(true);
      });
    }
  }

  addSubReply(reply: string) {
    if (!reply.length) return;

    // Remove @username from the reply
    if (reply[0] == "@") {
      reply = reply.slice(reply.indexOf(" ") + 1);
    }

    const newReply = this.generateNewReply(reply, this.comment.user.username);
    const instance = new Reply(this.currentUser, newReply);

    if (this.replyEl.closest(".replies__container")) {
      (
        this.replyEl.closest(".replies__container") as HTMLElement
      ).insertAdjacentElement("beforeend", instance.replyEl);
      instance.replyEl.classList.add("slideDown");
    }
  }
}
