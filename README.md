# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Notes](#notes)
  - [Useful resources](#useful-resources)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

#### Mobile
![localhost_5173_](https://github.com/hqz3/fem-interactive-comments-section/assets/68667158/3fffd4ec-24fd-453b-bbf5-483fb5664402)

#### Desktop
![localhost_5173_ (1)](https://github.com/hqz3/fem-interactive-comments-section/assets/68667158/27739646-29c3-42d4-a42a-b632da902237)

### Links

- [Solution URL](https://www.frontendmentor.io/solutions/mobilefirst-interactive-comments-section-w-vanilla-typescript-oop-9UhDBomzki)
- [Live Site URL](https://hqz3.github.io/fem-interactive-comments-section/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flexbox
- CSS Grid
- Mobile-first workflow
- TypeScript
- Object-oriented programming

### Notes

This project was well-suited for OOP. In addition to the `App` class which initiates the application, I also created two classes, `Comment` and `Reply`, both of which are essentially the same with some slight differences. Ideally, I could have reused the `Comment` class recursively to make reply instances but the differences in their respective DOM structures made it tricky to implement. Instead, I created a `Post` parent class that extends to both the `Comment` and `Reply` subclasses.

Using object inheritance helped remove a significant number of properties and methods from the child classes. Most of these properties and methods are either the same or very similar. For the latter case, adding parameters made these methods dynamically reusable. Having a single source of truth kept the code `DRY` and significantly simplified the process of reading and modifying the code.

### Useful resources

- [quicktype](https://quicktype.io/) - Handy tool to generate all JSON types from data.json.
