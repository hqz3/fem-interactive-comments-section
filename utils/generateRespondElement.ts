import { User } from "../src/App";

export const generateRespondElement = (currentUser: User) => {
  const element = document.createElement("form") as HTMLFormElement;
  element.classList.add("comment__container", "respond");

  element.innerHTML = `
  <textarea
    class="respond__textarea"
    name="text"
    placeholder="Add a comment..."
  ></textarea>
  <img
    class="comment__user-image respond__user-image"
    src="${currentUser.image.png}"
    alt="${currentUser.username}"
  />
  <button class="respond__button" type="submit" aria-label="Respond">Send</button>
`;

  return element;
};
