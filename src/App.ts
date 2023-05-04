import serverData from "../data.json";
import { Comment } from "./Comment";
import { generateRespondElement } from "../utils/generateRespondElement";

export type Data = {
  currentUser: User;
  comments: CommentType[];
};

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: CommentType[];
  replyingTo?: string;
};

export type User = {
  image: Image;
  username: string;
};

export type Image = {
  png: string;
  webp: string;
};

export class App {
  app: HTMLElement;
  data: Data;
  currentUser: User;
  comments: CommentType[];

  commentsEl: HTMLElement;
  respondEl: HTMLElement;

  constructor() {
    this.app = document.getElementById("app") as HTMLElement;
    this.data = serverData;
    this.currentUser = serverData.currentUser;
    this.comments = serverData.comments;

    this.commentsEl = document.createElement("main") as HTMLElement;
    this.commentsEl.classList.add("comments");
    this.app.appendChild(this.commentsEl);

    this.respondEl = generateRespondElement(this.currentUser);
    this.commentsEl.appendChild(this.respondEl);
  }

  load() {
    this.comments.forEach((comment) => {
      const node = new Comment(this.currentUser, comment);
      this.commentsEl.insertBefore(node.commentEl, this.respondEl);
    });
  }
}
