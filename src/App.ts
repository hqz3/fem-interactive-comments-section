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

  allCommentsEl: HTMLElement;
  respondEl: HTMLElement;

  constructor() {
    this.app = document.getElementById("app") as HTMLElement;
    this.currentUser = serverData.currentUser;
    this.comments = serverData.comments;

    this.allCommentsEl = document.querySelector(".allComments") as HTMLElement;

    this.respondEl = generateRespondElement(this.currentUser, "Send");
    this.respondEl.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const text = target.text.value;
      this.addComment(text);
      target.text.value = "";
    });

    this.allCommentsEl.appendChild(this.respondEl);
  }

  render() {
    this.comments.forEach((comment) => {
      const instance = new Comment(this.currentUser, comment);
      this.allCommentsEl.insertBefore(instance.commentEl, this.respondEl);
    });
  }

  addComment(text: string) {
    if (!text.length) return;

    const newComment = {
      id: Date.now(),
      user: this.currentUser,
      createdAt: "Just now",
      content: text,
      score: 0,
      replies: [],
    };

    const instance = new Comment(this.currentUser, newComment);
    instance.commentEl.classList.add("slideDown");
    setTimeout(() => {
      instance.commentEl.classList.remove("slideDown");
    }, 500);

    this.allCommentsEl.insertBefore(instance.commentEl, this.respondEl);
  }
}
