import { User, CommentType } from "./App";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";
import { generateRespondElement } from "../utils/generateRespondElement";
import { generateNewReply } from "../utils/generateNewReply";

export class Reply {
  currentUser: User;
  reply: CommentType;
  vote: -1 | 0 | 1;

  replyEl: HTMLElement;
  replyPanel: HTMLElement | null;
  replyContainerEl: HTMLElement;

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
        const textArea = this.replyEl.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;
        this.reply.content = textArea?.value || "";
        this.renderReply();
      }
    });
  }

  renderReply() {
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply
    );
  }

  handleVote(score: number) {
    this.reply.score += score;
    this.vote += score;
    this.renderReply();
  }

  showReplyPanel() {
    this.replyPanel = generateRespondElement(
      this.currentUser,
      "Reply",
      this.reply
    );
    this.replyPanel.classList.add("slideDown");
    this.replyContainerEl.insertAdjacentElement("afterend", this.replyPanel);

    // Add a new reply
    this.replyPanel.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = (e.target as HTMLFormElement).text.value;
      this.addSubReply(text);
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

  addSubReply(reply: string) {
    if (!reply.length) return;
    const newReply = generateNewReply(this.currentUser, reply);
    const instance = new Reply(this.currentUser, newReply);

    if (this.replyEl.closest(".replies__container")) {
      (
        this.replyEl.closest(".replies__container") as HTMLElement
      ).insertAdjacentElement("beforeend", instance.replyEl);
      instance.replyEl.classList.add("slideDown");
    }
  }

  renderUpdatePanel() {
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply,
      true
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
