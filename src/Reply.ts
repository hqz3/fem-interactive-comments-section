import { User, CommentType } from "./App";
import { generateCommentElement } from "../utils/generateCommentElement";

export class Reply {
  currentUser: User;
  reply: CommentType;
  replyEl: HTMLElement;

  constructor(currentUser: User, reply: CommentType) {
    this.currentUser = currentUser;
    this.reply = reply;

    this.replyEl = generateCommentElement(this.reply);
    this.replyEl.classList.add("reply");
  }
}
