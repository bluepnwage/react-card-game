import { test, expect } from "vitest";
import { createGame } from "./create-game";

test("returns an array", () => {
  const game = Array.isArray(createGame());
  expect(game).toBeTruthy();
});

test("has 4 rows", () => {
  let rows = 0;
  const game = createGame();
  game.forEach(() => (rows += 1));
  expect(rows).toBe(4);
});

test("each row has 3 items", () => {
  let hasThree = true;
  const game = createGame();
  game.forEach((row) => {
    if (row.length !== 3) hasThree = false;
  });
  expect(hasThree).toBeTruthy();
});

test("each item appears 2 times", () => {
  let appearsTwice = true;
  const game = createGame();
  const items: { [value: string]: number } = {};
  game.forEach((row) => {
    row.forEach((value) => {
      if (items[value]) {
        items[value]++;
      } else {
        items[value] = 1;
      }
    });
  });
  Object.values(items).forEach((value) => {
    if (value !== 2) appearsTwice = false;
  });
  expect(appearsTwice).toBeTruthy();
});
