import serverData from "../data.json";
import { Comment } from "./Comment";

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

    this.respondEl = document.createElement("form") as HTMLFormElement;
    this.respondEl.classList.add("comment", "respond");

    this.respondEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.respondEl.innerHTML = `
    <textarea
      class="respond__textarea"
      name="text"
      placeholder="Add a comment..."
    ></textarea>
    <img
      class="comment__user-image respond__user-image"
      src="${this.currentUser.image.png}"
      alt="${this.currentUser.username}"
    />
    <button class="respond__button" type="submit" aria-label="Respond">Send</button>
  `;
    this.commentsEl.appendChild(this.respondEl);
  }

  load() {
    this.comments.forEach((comment) => {
      const node = new Comment(this.currentUser, comment);
      this.commentsEl.insertBefore(node.element, this.respondEl);
    });
  }
}
