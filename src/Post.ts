import { User, CommentType } from "./App";
import { generateCommentElements } from "../utils/generateCommentElements";
import { generateRespondElement } from "../utils/generateRespondElement";

export class Post {
  currentUser: User;
  comment: CommentType;
  vote: -1 | 0 | 1;

  replyPanel: HTMLElement | null;

  constructor(currentUser: User, comment: CommentType) {
    this.currentUser = currentUser;
    this.comment = comment;
    this.vote = 0;

    this.replyPanel = null;
  }

  createDivElement(...classString: string[]) {
    const element = document.createElement("div");
    element.classList.add(...classString);
    return element;
  }

  renderComment(container: HTMLElement, isReply: boolean = false) {
    container.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment,
      { isReply }
    );
  }

  handleVote(score: number) {
    this.comment.score += score;
    this.vote += score;
  }

  generateReplyPanel() {
    this.replyPanel = generateRespondElement(
      this.currentUser,
      "Reply",
      this.comment
    );
    this.replyPanel.classList.add("slideDown");
  }

  generateNewReply(content: string, replyingTo: string) {
    return {
      id: Date.now(),
      user: this.currentUser,
      createdAt: "Just now",
      content,
      score: 0,
      replies: [],
      replyingTo,
    };
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

  renderUpdatePanel(container: HTMLElement) {
    container.innerHTML = generateCommentElements(
      this.currentUser,
      this.comment,
      { isEditing: true }
    );
    const textareaEl = container.querySelector(
      "textarea"
    ) as HTMLTextAreaElement;

    textareaEl.style.height = `${textareaEl.scrollHeight}px`;
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
