import { User, CommentType } from "./App";
import { createElement } from "../utils/createElement";
import { generateCommentElements } from "../utils/generateCommentElements";

export class Reply {
  currentUser: User;
  reply: CommentType;
  replyEl: HTMLElement;
  replyContainerEl: HTMLElement;

  constructor(currentUser: User, reply: CommentType) {
    this.currentUser = currentUser;
    this.reply = reply;

    this.replyEl = createElement("comment", "reply");
    this.replyContainerEl = createElement("comment__container");
    this.replyContainerEl.innerHTML = generateCommentElements(
      this.currentUser,
      this.reply
    );

    this.replyEl.appendChild(this.replyContainerEl);
  }
}
