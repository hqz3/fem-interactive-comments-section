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
        this.handleVote(1);
      } else if (
        target.classList.contains("vote__downvote") &&
        this.vote >= 0
      ) {
        this.handleVote(-1);
      } else if (target.classList.contains("comment__reply")) {
        if (this.replyPanel) return this.removeReplyPanel();
        this.showReplyPanel();
      } else if (target.classList.contains("comment__delete")) {
        this.showDeleteModal(target);
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

  handleVote(score: number) {
    this.comment.score += score;
    this.vote += score;
    this.renderUserComment();
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

    // Add a new comment
    this.replyPanel.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = (e.target as HTMLFormElement).text.value;
      this.addReply(text);
      this.removeReplyPanel(true);
    });
  }

  removeReplyPanel(isSubmit: boolean = false) {
    if (this.replyPanel instanceof HTMLElement) {
      if (isSubmit) {
        this.replyPanel.remove();
        this.replyPanel = null;
      } else {
        this.replyPanel.classList.add("slideUp");
        this.replyPanel.addEventListener("animationend", () => {
          this.replyPanel?.remove();
          this.replyPanel = null;
        });
      }
    }
  }

  addReply(reply: string) {
    if (!reply.length) return;

    // Remove @username from the reply
    if (reply[0] == "@") {
      reply = reply.slice(reply.indexOf(" ") + 1);
    }

    const newReply = generateNewReply(
      this.currentUser,
      reply,
      this.comment.user.username
    );
    const instance = new Reply(this.currentUser, newReply);

    this.repliesContainerEl.appendChild(instance.replyEl);
    instance.replyEl.classList.add("slideDown");
  }

  renderUpdatePanel() {
    this.commentContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment,
      { isEditing: true }
    );
  }

  removeComment(commentEl: HTMLElement) {
    commentEl.classList.add("slideUp");
    commentEl.addEventListener("animationend", () => commentEl.remove());
  }

  showDeleteModal(target: HTMLElement) {
    const commentEl = target.closest(".comment") as HTMLElement;
    const app = document.querySelector("#app");
    const modalTemplate = document.querySelector(
      "template"
    ) as HTMLTemplateElement;

    const clone = document.importNode(
      modalTemplate.content,
      true
    ) as DocumentFragment;

    const modalEl = clone.querySelector(".modal") as HTMLElement;
    modalEl?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("delete__yes")) {
        this.removeComment(commentEl);
        this.hideDeleteModal();
      } else if (target.classList.contains("delete__no")) {
        this.hideDeleteModal();
      }
    });

    app?.appendChild(modalEl);
  }

  hideDeleteModal() {
    const modalEl = document.querySelector(".modal") as HTMLElement;
    modalEl.classList.add("fadeOut");
    modalEl.addEventListener("animationend", () => {
      modalEl.remove();
    });
  }
}
