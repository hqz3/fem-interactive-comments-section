import { CommentType, User } from "../src/App";

export const generateRespondElement = (
  currentUser: User,
  type: "Send" | "Reply" | "Update",
  comment?: CommentType | null
) => {
  const element = document.createElement("form") as HTMLFormElement;
  element.classList.add("comment__container", "respond");

  const atUsername = `@${comment?.user.username}`;

  element.innerHTML = `
  <textarea
    class="respond__textarea"
    name="text"
    placeholder="Add a comment..."
  >${type === "Reply" ? atUsername + " " : ""}</textarea>
  <img
    class="comment__user-image respond__user-image"
    src="${currentUser.image.png}"
    alt="${currentUser.username}"
  />
  <button class="respond__button" type="submit" aria-label=${type}>${type}</button>
`;

  return element;
};
