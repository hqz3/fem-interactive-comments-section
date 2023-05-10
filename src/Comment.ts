import { Post } from "./Post";
import { User, CommentType } from "./App";
import { Reply } from "./Reply";

export class Comment extends Post {
  commentEl: HTMLElement;
  commentContainerEl: HTMLElement;
  repliesContainerEl: HTMLElement;

  constructor(currentUser: User, comment: CommentType) {
    super(currentUser, comment);

    this.commentEl = this.createDivElement("comment");
    this.commentContainerEl = this.createDivElement("comment__container");
    this.repliesContainerEl = this.createDivElement("replies__container");

    this.commentEl.appendChild(this.commentContainerEl);
    this.commentEl.appendChild(this.repliesContainerEl);

    this.renderComment(this.commentContainerEl);
    this.loadReplies();

    this.commentEl.addEventListener("click", (e: Event) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;
      if (target.classList.contains("vote__upvote") && this.vote <= 0) {
        this.handleVote(1);
        this.renderComment(this.commentContainerEl);
      } else if (
        target.classList.contains("vote__downvote") &&
        this.vote >= 0
      ) {
        this.handleVote(-1);
        this.renderComment(this.commentContainerEl);
      } else if (target.classList.contains("comment__reply")) {
        if (this.replyPanel) return this.removeReplyPanel();
        this.showReplyPanel();
      } else if (target.classList.contains("comment__delete")) {
        this.showDeleteModal(target);
      } else if (target.classList.contains("comment__edit")) {
        this.renderUpdatePanel(this.commentContainerEl);
      } else if (target.classList.contains("update__button")) {
        const textArea = this.commentContainerEl.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;
        this.comment.content = textArea?.value || "";
        this.renderComment(this.commentContainerEl);
      }
    });
  }

  loadReplies() {
    this.comment.replies?.map((reply) => {
      const node = new Reply(this.currentUser, reply);
      this.repliesContainerEl.appendChild(node.replyEl);
    });
  }

  showReplyPanel() {
    this.generateReplyPanel();
    if (this.replyPanel) {
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
  }

  addReply(reply: string) {
    if (!reply.length) return;

    // Remove @username from the reply
    if (reply[0] == "@") {
      reply = reply.slice(reply.indexOf(" ") + 1);
    }

    const newReply = this.generateNewReply(reply, this.comment.user.username);
    const instance = new Reply(this.currentUser, newReply);

    this.repliesContainerEl.appendChild(instance.replyEl);
    instance.replyEl.classList.add("slideDown");
  }
}
