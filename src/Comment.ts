import { User, CommentType } from "./App";
import { Reply } from "./Reply";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";
import { generateRespondElement } from "../utils/generateRespondElement";
import { generateNewReply } from "../utils/generateNewReply";

export class Comment {
  currentUser: User;
  comment: CommentType;
  vote: -1 | 0 | 1;

  commentEl: HTMLElement;
  commentContainerEl: HTMLElement;
  replyPanel: HTMLElement | null;
  repliesContainerEl: HTMLElement;

  constructor(currentUser: User, comment: CommentType) {
    this.currentUser = currentUser;
    this.comment = comment;
    this.vote = 0;
    this.replyPanel = null;

    this.commentEl = createElement("comment");
    this.commentContainerEl = createElement("comment__container");
    this.repliesContainerEl = createElement("replies__container");

    this.commentEl.appendChild(this.commentContainerEl);
    this.commentEl.appendChild(this.repliesContainerEl);

    this.renderUserComment();
    this.loadReplies();

    this.commentEl.addEventListener("click", (e: Event) => {
      e.stopPropagation();

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
      } else if (target.classList.contains("comment__reply")) {
        if (this.replyPanel) return this.removeReplyPanel();

        const replyPanel = this.showReplyPanel();
        replyPanel.addEventListener("submit", (e) => {
          e.preventDefault();
          const text = (e.target as HTMLFormElement).text.value;
          this.addReply(text);
          this.removeReplyPanel();
        });
      } else if (target.classList.contains("comment__delete")) {
        target.closest(".comment")?.remove();
      } else if (target.classList.contains("comment__edit")) {
        this.renderUpdatePanel();
      } else if (target.classList.contains("update__button")) {
        const textArea = this.commentContainerEl.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;
        this.comment.content = textArea?.value || "";
        this.renderUserComment();
      }
    });
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

  showReplyPanel() {
    this.replyPanel = generateRespondElement(
      this.currentUser,
      "Reply",
      this.comment
    );
    this.replyPanel.classList.add("slideDown");
    this.repliesContainerEl.insertAdjacentElement(
      "beforebegin",
      this.replyPanel
    );
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
    const newReply = generateNewReply(this.currentUser, reply);
    const instance = new Reply(this.currentUser, newReply);

    this.repliesContainerEl.appendChild(instance.replyEl);
    instance.replyEl.classList.add("slideDown");
  }

  renderUpdatePanel() {
    this.commentContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment,
      true
    );
  }
}
