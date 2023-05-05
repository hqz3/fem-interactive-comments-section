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

  currentUser: User;
  comments: CommentType[];
  commentInstances: { [key: number]: Comment };

  allCommentsEl: HTMLElement;
  respondEl: HTMLElement;

  constructor() {
    this.app = document.getElementById("app") as HTMLElement;
    this.currentUser = serverData.currentUser;
    this.comments = serverData.comments;
    this.commentInstances = {};

    this.allCommentsEl = document.querySelector(".allComments") as HTMLElement;

    this.respondEl = generateRespondElement(this.currentUser);
    this.allCommentsEl.appendChild(this.respondEl);
  }

  render() {
    this.comments.forEach((comment) => {
      const instance = new Comment(this.currentUser, comment);
      this.commentInstances[comment.id] = instance;

      this.allCommentsEl.insertBefore(instance.commentEl, this.respondEl);
    });
  }
}
