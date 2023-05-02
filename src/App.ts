import serverData from "../data.json";

export type Data = {
  currentUser: User;
  comments: Comment[];
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Comment[];
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
  user: User;
  comments: Comment[];

  postsEl: HTMLElement;

  constructor() {
    this.app = document.getElementById("app") as HTMLElement;
    this.data = serverData;
    this.user = serverData.currentUser;
    this.comments = serverData.comments;

    this.postsEl = document.createElement("main") as HTMLElement;
    this.postsEl.classList.add("posts");
  }

  load() {
    this.app.appendChild(this.postsEl);
  }
}
