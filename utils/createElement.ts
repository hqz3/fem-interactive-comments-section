export const createElement = (...classString: string[]) => {
  const element = document.createElement("div");
  element.classList.add(...classString);
  return element;
};
